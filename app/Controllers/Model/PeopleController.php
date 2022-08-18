<?php

namespace App\Controllers\Model;

use App\Controllers\DB\SqlController;
use App\Controllers\Model;

class PeopleController extends Model {
    
    public function listAll()
    {
        $sql = new SqlController();
        return $results = $sql->select("SELECT * FROM father a INNER JOIN children b");
    }

    public function save()
    {
        $sql = new SqlController();
        $result_father = $sql->select("CALL father(:name)", array(
            ":name"=>$this->getnamefather()
        ));
        // $result_children = $sql->select("CALL children(:father_id, :name)", array(
        //     ":father_id"=>$this->getfatherid(),
        //     ":name"=>$this->getnamechildren()
        // ));
        $this->setData($result_father[0]);
        // $this->setData($result_children[0]);
    }
}

?>