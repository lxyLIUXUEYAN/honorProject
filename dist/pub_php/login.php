<?php

      header("Content-Type: text/html;charset=utf-8");
      #登陆;
      
      # 1. 获取数据;

      $uname = $_POST["uname"];
      $pwd = $_POST["pwd"];


      if(!$uname || !$pwd ){
            die('{"state":"error","errorType":"参数不全","stateCode":"2"}');
      }

      # 2. 验证数据是否存在;

      # 2.1 链接数据库;

      require("./connect.php");

      $select_query = "SELECT * FROM honoruser";

      $select_res = mysql_query($select_query);

      while($row = mysql_fetch_array($select_res)){
            // 有没有用户名;
            if($row["uname"] === $uname){
                  // 判定密码是否正确;
                  if($row["pwd"] === md5($pwd)){
                        die('{"state":"success","errorType":"null","stateCode":"1"}');
                  }
            }
      }
      

?>