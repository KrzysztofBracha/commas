"use strict";
$(document).ready(function () {
  let text = ["Cała klasa wybiera się na wycieczkę, ja muszę zostać w domu.",
              "Cała klasa wybiera się na wycieczkę - ja muszę zostać w domu.",
              "Ojciec kupi synowi sportowy rower, syn powinien być mu wdzięczny.",
              "Nie uważał na lekcji, teraz czeka go dużo pracy w domu.",
              "Kiedy przyjadę do domu, włączę od razu telewizor.",
              "Boli mnie głowa, bo w nocy za mało spałem.",
              "Jest pewien, że dostanie nagrodę.",
              "Kot, kiedy jest zdenerwowany, bywa niebezpieczny.",
              "Marek, choć jeszcze trochę chory, idzie do pracy."];
  let text_arr_global = [];
  let quantity_comma_arr_global = [];
  let amount_comma_arr_global = [];
  let comma_arr_global = [];
  let preview_arr_global = [];
  let wrong_arr_global = [];

  for (let i = 0; i < text.length; i++) {
    let text_arr_z = text[i].split(" ");
    let text_arr_z_2 = text[i].split(" ");
    let text_without = text[i].replace(/,/g, '');
    let text_arr = text_without.split(" ");
    let quantity_comma = 0;
    let quantity = 0;
    amount_comma_arr_global[i] = 0;
    wrong_arr_global[i] = false;

    for (let j = 0; j < text_arr_z.length - 1; j++) {
      quantity++;
      text_arr.splice(j + quantity, 0, ' ');
      text_arr_z_2.splice(j + quantity, 0, ' ');
    }

    let comma_arr = [text_arr_z_2.length];
    for (let j = 0; j < text_arr_z_2.length; j++) {
      comma_arr[j] = 0;
    }

    quantity = 0
    for (let j = 0; j < text_arr_z_2.length - 1; j++) {
      let if_comma = text_arr_z_2[j].charAt(text_arr_z_2[j].length - 1);
      if (if_comma == ',') {
        comma_arr[j + 1] = 1;
        quantity++;
      }
    }
    quantity_comma_arr_global[i] = quantity;
    comma_arr_global[i] = comma_arr.slice();
    text_without = text_arr.join("");
    text_arr_global[i] = text_arr.slice();
    preview_arr_global[i] = text_arr.slice();

    let html = `<article class="questionArea" id="pytanie_${i}">
                <div class="questionText" id="pyt_${i}">`;
    let a = 0;
    for (let j = 0; j < text_arr.length; j++) {
      if (comma_arr[j] == 1) {
        html += `<div class="droppable ok" id="drop_${j}"></div>`;
        a++;
      } else if (text_arr[j] == " ")
        html += `<div class="droppable" id="drop_${j}"></div>`;
      else
        html += text_arr[j];
    }
    html += `</div><div class="preview" id="pod_${i}">${text_without}</div>`;
    html += `<button type="button" class="spr" id="btn_${i}">Sprawdź</button>
            <span class="info" id="info_${i}"></span></article> `;
    document.getElementsByTagName('main')[0].innerHTML += html;
  }

  function gen_preview(i, j) {
    preview_arr_global[i][j] = ", ";
    let text_without = preview_arr_global[i].join("");
    let ident = "pod_" + i;
    document.getElementById(ident).innerHTML = text_without;
  }

  function init() {
    $(".droppable").click(function () {
      let ident = $(this).parent('.questionText').attr('id');
      let nr = ident.charAt(4);
      let j = $(this).attr('id');
      j = j.substr(5, j.length);
      gen_preview(nr, j);
      $(this).css("background-color", "blue");
      if ($(this).hasClass('ok')) {
        amount_comma_arr_global[nr]++;
      } else {
        wrong_arr_global[nr] = true;
      }
    });
  }
  init();

  $('.spr').click(function () {
    let ident = $(this).attr('id');
    let nr = ident.charAt(4);
    let info = "#info_" + nr;
    if ((amount_comma_arr_global[nr] == quantity_comma_arr_global[nr]) && (wrong_arr_global[nr] == false)) {
      $(info).html("Dobrze");
      $(info).css("color", "green");
    } else {
      $(info).html("Źle");
      $(info).css("color", "red");
    }
  });
});
