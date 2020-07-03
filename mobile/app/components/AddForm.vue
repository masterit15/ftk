<template>
        <StackLayout>
            <TextField v-model="description" hint="Описание" />
            <TextField v-model="filesPath" hint="Описание" />
            <Button text="Добавить Заявку" @tap="addClaim" />
        </StackLayout>
    
</template>

<script>
    export default {
        data() {
            return {
                answerDescription: '',
                answerFiles: [],
                creationDate: '',
                creatorID: '',
                departmentID: '',
                description: '',
                filesPath: [],
                responsibleID: '',
                status: false,
                timeline: [],
            };
        },
        methods: {
            addClaim() {
                this.alert("Yes!");
            },
            alert(message) {
                return alert({
                    title: "AMC ФТК",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    };
</script>

<style>
</style>