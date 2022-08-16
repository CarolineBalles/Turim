<?php

namespace App\Model;

use App\Controllers\DB\SqlController;
use App\Model;

class PeopleController extends Model {
    
    public static function listAll()
    {
        $sql = new SqlController();
        return $sql->select("SELECT * FROM father a INNER JOIN children b USING(father_id) ORDER BY b.name");
    }

    public function save()
    {
        $sql = new SqlController();
        $result_father = $sql->select("CALL father(:name)", array(
            ":name"=>$this->getnamefather()
        ));
        $result_children = $sql->select("CALL children(:father_id, :name)", array(
            ":father_id"=>$this->getfatherid(),
            ":name"=>$this->getnamechildren()
        ));
        $this->setData($result_father[0]);
        $this->setData($result_children[0]);
    }
}

?>