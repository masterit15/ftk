<template>
  <div id="fileuploader">
    <div class="form_row__photo-previews">
      <input type="file" name="more_photos[]" multiple id="js-photo-upload" />
      <div class="add_photo-content">
        <div class="add_photo-item"></div>
        <ul id="uploadImagesList">
          <li class="item">
            <span class="icon-wrap">
              <i class="fa"></i>
            </span>
            <span class="img-wrap">
              <img src alt />
            </span>
            <span class="delete-link" title="Удалить">
              <i class="fa fa-times"></i>
            </span>
          </li>
        </ul>
      </div>
      <div class="errormassege"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "fileuploader",
  data() {
    return {
      files: []
    };
  },
  mounted() {
    this.uploaderImg(
      ".add_photo-item",
      "#js-photo-upload",
      "#uploadImagesList",
      false,
      false
    );
  },
  methods: {
    addFiles(files){
      this.files = files
      this.$emit('files', this.files)
    },
    uploaderImg(addButton, addInput, imgList, reset = false, edit = false) {
      $(addButton).on("click", function() {
        $(addInput).trigger("click");
      });
      let that = this
      let maxFileSize = 5 * 1024 * 1024; // (байт) Максимальный размер файла (2мб)
      let queue = {};
      let imagesList = $(imgList);
      let filelist = $(".file_list").children().length;
      // 'detach' подобно 'clone + remove'
      let itemPreviewTemplate = imagesList.find(".item").detach();
      // Вычисление лимита
      function limitUpload() {
        if (filelist > 0 || edit) {
          return 5 - filelist;
        } else if (filelist == 0 || !edit) {
          return 5 - imagesList.children().length;
        }
      }
      // Отображение лимита
      function limitDisplay() {
        let sTxt;
        switch (limitUpload()) {
          case 5:
            sTxt =
              '<span class="text">Прикрепить ' +
              limitUpload() +
              ' файлов</span> <span class="plus">+</span>';
            break;
          case 0:
            sTxt = "Достигнут лимит";
            break;
          default:
            sTxt = "+ (можно добавить ещё " + limitUpload() + ")";
        }
        $(addButton).html(sTxt);
      }
      function limitSize() {
        $(addInput).bind("change", function() {
          let total = 0;
          for (var i = 0; i < this.files.length; i++) {
            total = total + this.files[i].size;
          }
          return total;
        });
      }
      limitSize();
      
      $(addInput).on("change", function() {
        let files = this.files;
        let fileTypeArr = [
          "jpeg",
          "jpg",
          "png",
          "pdf",
          "doc",
          "docx",
          "xls",
          "xlsx",
          "zip",
          "rar"
        ];
        // Перебор файлов до лимита
        for (var i = 0; i < limitUpload(); i++) {
          let file = files[i];
          if (file !== undefined) {
            that.addFiles(file)
            let fileType = file.name.split(".").pop();
            if ($.inArray(fileType, fileTypeArr) < 0) {
              $(".errormassege").text("");
              $(".errormassege").append(
                "Файлы должны быть в формате jpg, jpeg, png, zip, doc, docx, xls, xlsx, pdf"
              );
              continue;
            }
            if (file.size > maxFileSize) {
              $(".errormassege").append(
                "Размер файла не должен превышать 2 Мб"
              );
              continue;
            }
            $(".errormassege").html("");
            preview(file, fileType);
          }
        }
        this.value = "";
      });

      function preview(file, fileType) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
          if (fileType == "jpeg" || fileType == "jpg" || fileType == "png") {
            var img = document.createElement("img");
            var itemPreview = itemPreviewTemplate.clone();
            itemPreview.find(".img-wrap img").attr("src", event.target.result);
            itemPreview.data("id", file.name);
            imagesList.append(itemPreview);
          } else {
            var itemPreview = itemPreviewTemplate.clone();
            $(itemPreview)
              .find(".img-wrap")
              .remove();
            let icon = "fa-file";
            switch (fileType) {
              case "xls":
                icon = "fa-file-excel-o";
                break;
              case "xlsx":
                icon = "fa-file-excel-o";
                break;
              case "rar":
                icon = "fa-file-archive-o";
                break;
              case "zip":
                icon = "fa-file-archive-o";
                break;
              case "docx":
                icon = "fa-file-word-o";
                break;
              case "doc":
                icon = "fa-file-word-o";
                break;
              case "pdf":
                icon = "fa-file-pdf-o";
                break;
              default:
                icon = "fa-file";
                break;
            }
            itemPreview.find(".icon-wrap i").addClass(icon);
            itemPreview.data("id", file.name);
            imagesList.append(itemPreview);
          }
          // Обработчик удаления
          itemPreview.on("click", function() {
            delete queue[file.name];
            $(this).remove();
            limitDisplay();
          });
          queue[file.name] = file;
          // Отображение лимита при добавлении
          limitDisplay();
        });
        reader.readAsDataURL(file);
      }
      // Очистить все файлы
      function resetFiles() {
        $(addInput)[0].value = "";
        limitDisplay();
      }
      if (reset) {
        resetFiles();
      }
      // Отображение лимита при запуске
      limitDisplay();
    }
  }
};
</script>

<style>
</style>