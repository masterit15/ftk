const { Router } = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Departament = require('../models/Departament')
const RefToken = require('../models/refreshToken')
const router = Router()

/*
    метод регистрации
*/
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов').isLength({ options: { min: 8 } })
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            const { login, email, username, password, permission, departament } = req.body
            const hashedPassword = await bcrypt.hash(password, 12)
            const candidate = await User.findOne({ where: { login } })
            const dep = await Departament.findOne({ where: { name: departament } })
            let depID = null

            if (dep) {
                depID = dep.dataValues.id
            } else {
                await Departament.create({
                    name: departament
                }).then(departament => {
                    depID = departament.dataValues.id
                }).catch((err) => { });
            }
            if (candidate) {
                return res.json({ message: 'Такой пользователь уже существует' })
            }
            User.create({
                login,
                email,
                username,
                avatar: '',
                permission: permission ? permission : 'Сотрудник',
                password: hashedPassword,
                departamentId: depID
            }).then(users => {
                return res.status(201).json({
                    success: true,
                    message: 'Пользователь создан',
                    users
                })
            }).catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: 'Что-то пошло не так, попробуйте еще раз',
                    err
                })
            });
        } catch (e) {
            res.status(500).json({
                err: e,
                message: 'Что-то пошло не так, попробуйте еще раз'
            })
        }
    })
/*
    метод авторизации
*/
router.post(
    '/login',
    [
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array(),
                    message: 'Некорректные данные при входе в систему!!!!!!'
                })
            }
            const { login, password } = req.body
            const user = await User.findOne({ where: { login } })
                .then(user => {
                    if (!user) return;
                    return user.dataValues
                })
                .catch(err => console.log(err));

            if (!user) {
                return res.status(400)
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            const Rtoken = await RefToken.create({ refreshToken })
            res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                expires_in: Date.now(),
                login,
                userId: user.id,
                username: user.username,
                subscription: user.subscription,
                avatar: user.avatar
            })

        } catch (e) {
            res.status(500).json({ e, message: 'Что-то пошло не так, попробуйте еще раз' })
        }
    }
)

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(403)
    const decoded = jwt.verify(refreshToken, config.get('jwtRefreshSecret'), (err, user) => {
        if (err && err.message === 'jwt expired'){
            return err.message
        }else{
            return user
        }
    })
    if (decoded === 'jwt expired') {
        return res.status(403).json({ success: false, message: 'Нет авторизации или закончилась сессия' })
    }else{
        const accessToken = generateAccessToken(decoded)
        const newrefreshToken = generateRefreshToken(decoded)
        res.status(201).json({
            success: true,
            accessToken,
            refreshToken: newrefreshToken,
            expires_in: Date.now()
        })
        await RefToken.create({ refreshToken: newrefreshToken })
        await RefToken.destroy({where: { refreshToken }})
    }
})

router.delete('/logout', async (req, res) => {
    const refreshToken = req.query.token
    if (refreshToken == null) return res.sendStatus(401)
    await RefToken.destroy({
        where: { refreshToken }
    })
    return res.json({
        success: true,
    })
})
function generateAccessToken(user) {
    return jwt.sign({ userId: user.id, permission: user.permission, departamentId: user.departamentId }, config.get('jwtSecret'), { expiresIn: '15m' })
}
function generateRefreshToken(user) {
    return jwt.sign({ userId: user.id, permission: user.permission, departamentId: user.departamentId }, config.get('jwtRefreshSecret'), { expiresIn: '30m' })
}
module.exports = router