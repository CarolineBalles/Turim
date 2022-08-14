<?php

namespace App\Model;

use App\Controllers\DB\SqlController;
use App\Model;

class People extends Model {
    public static function listAll()
    {
        $sql = new SqlController();
        return $sql->select("SELECT * FROM people a INNER JOIN children b USING(people_id) ORDER BY b.name");
    }

    public function save()
    {
        $sql = new SqlController();
        $result_people = $sql->select("CALL people(:name)", array(
            ":name"=>$this->getnamepeople()
        ));
        $result_children = $sql->select("CALL children(:people_id, :name)", array(
            ":people_id"=>$this->getpeopleid(),
            ":name"=>$this->getnamechildren()
        ));
        $this->setData($result_people[0]);
        $this->setData($result_children[0]);
    }
}

?>