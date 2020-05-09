"use strict";

//変数の定義
let answer = "";//answer


let clearflag = false;//数字の有無
let enzan = "";//演算記号の初期は空。
let dot = false;//小数点の有無。
let errorflag = false;//エラーフラグ
let cflag = false;//AC,Cの切り替え


//ACを押すと値がクリアされる。
$(function () {
  $("#clear").click(function () {
    //cflag = true ACがCになっていたら
    if (cflag == true) {
      $("#answer").val("");
      cflag = false;
      $("#clear").val("AC");
      $(".button").prop("disabled", false);
      console.log(answer);
    }//clag = false ACのとき
    else if (cflag == false) {
      $("#answer").val("");
      answer = "";
      $("#clear").val("AC");
      //演算記号もクリアにしておく。
      enzan = "";
      $("#dot").prop("disabled", false);
      $(".button").prop("disabled", false);
      dot = false;
      clearflag = false;
      errorflag = false;
      console.log(answer);
    }
  });
});

//数字ボタンを押すと数値が入力される。
$(function () {
  $(".button").click(function () {
    //入力可能桁数を10桁までにする
    if ($("#answer").val().length >= 10) {
      $(".button").prop("disabled", true);
      $("#answer").val("error!");
    } else {
      //cleaflag = trueなら表示中の数字をクリアする。
      if (clearflag === true) {
        $("#answer").val("");
        //数字を押したときに表示がクリアされるようクリアフラグを立てる
        clearflag = false;
        //小数点をまた押せるようにする
        $("#dot").prop("disabled", false);
      }
    }

    //AC表示をCに切り替える
    $("#clear").val("C");
    Number($("#answer").val($("#answer").val() + $(this).val()));
    cflag = true;
  });
});

//もし小数点が1度押されたら表示中に2度は押せなくする。
$(function () {
  $("#dot").on("click", function () {
    $("#dot").prop("disabled", true);
    Number($("#answer").val($("#answer").val() + $(this).val()));
  });
});

//足し算記号を押したらenzanClickに"+"を渡す。
$(function () {
  $("#addition").click(function () {
    enzanClick("+")
  });
});

//引き算記号を押したらenzanClickに"-"を渡す。
$(function () {
  $("#substraction").click(function () {
    enzanClick("-")
  });
});

//掛け算記号を押したらenzanClickに"×"を渡す。
$(function () {
  $("#multiplication").click(function () {
    enzanClick("×")
  });
});

//割り算記号を押したらenzanClickに"÷"を渡す。
$(function () {
  $("#devision").click(function () {
    enzanClick("÷")
  });
});

//%を押したら表示中の数字に0.01掛ける。
$(function () {
  $("#percent").click(function () {
    $("#answer").val(Number($("#answer").val()) * 0.01);
  });
});

//+/-を押したら表示中の数字に(-1)を掛ける。
$(function () {
  $("#plusminus").click(function () {
    $("#answer").val(Number($("#answer").val()) * (-1));
  });
});

//enzanClickは前の演算記号を覚えてなければ今の表示している値をanswerに保存する。
function enzanClick(kigou) {
  if (enzan === "") {
    answer = Number($("#answer").val());
  } else {
    enzanClick1()
  }
  //表示桁を10桁までにする  
  digit()

  clearflag = true;
  enzan = kigou;
}

//演算記号に何か覚えていれば、answerに保存した値と表示中の値と記憶した演算記号で計算する。
function enzanClick1() {
  if (enzan === "+") {
    answer += Number($("#answer").val());
  } else if (enzan === "-") {
    answer -= Number($("#answer").val());
  } else if (enzan === "×") {
    answer *= Number($("#answer").val());
  } else if (enzan === "÷") {
    answer /= Number($("#answer").val());
  }
}

//＝を押したとき
$(function () {
  $("#equal").click(function () {
    enzanClick1()
    digit()

    clearflag = false;
    cflag = false;
    $("#clear").val("AC");
  });
});

//表示桁を10桁以内にする
function digit() {
  //小数点で切り分ける
  let num1 = String(answer).split(".");

  //整数部で11桁以上の場合、エラーを表示
  if (num1[0].length > 10) {
    $("#answer").val("error!");
    errorflag = true;
  }
  //整数部が10桁までの場合、整数部はそのまま表示、少数部は値を丸めて全部で10桁以内にする
  //10から整数部の桁を引いた数だけ小数部を表示できる
  else if (String(answer).length >= 10 && num1[0].length <= 10) {
    let n = 10 - num1[0].length;
    answer = Number(answer).toFixed(n);
    $("#answer").val(answer);
  } else {
    $("#answer").val(answer);
  }


  //★以下でも表示桁が10桁にできる
  //    else {
  //      answer = Math.round(answer * 1000000000) / 1000000000;
  //   }
}
