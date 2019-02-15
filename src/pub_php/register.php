<?php

      header("Content-Type: text/html;charset=utf-8");

      #注册;

      #1.目标 -> 获取数据;

      // @ 不报错 -> 允许空值;
      $uname = @$_REQUEST["uname"];
      $pwd = @$_REQUEST["pwd"];

      #2. 验证 -> 数据是否存在;

      if(!$uname || !$pwd){
            die('{"state":"error","errorType":"参数不能为空","stateCode":"2"}');
      }

      #2.2 验证 -> 数据是否重复;

      require("./connect.php");
      $select_query = "SELECT uname FROM honoruser";
      $select_res = mysql_query($select_query);

      while($row = mysql_fetch_array($select_res)){
            // $uname => 代表用户输入的用户名;
            // $row => 代表数据库里面的每一行;
            if($uname === $row["uname"]){
                  mysql_close($con);
                  die('{"state":"error","stateCode":"用户名重复","errorState":"4"}');
            }
      }

      #3. 插入数据;
      $password = md5($password);
      $inster_query = "INSERT INTO honoruser (uname , pwd) VALUES ('$uname','$pwd')";

      $insert_res =  mysql_query($inster_query);

      if($insert_res){
            die('{"state":"success","errorType":"null","stateCode":"1"}');
      }else{
            die('{"state":"error","errorType":"数据库写入失败","stateCode":"5"}');
      }
?>