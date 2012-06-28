<?php
include_once('tm/rdsinfo.php');
include('tm/ChromePhp.php');

$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);
if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}
ChromePhp::log($db->host_info . "\n");
$whereClause = $_REQUEST['whereClause'];
$limitClause = $_REQUEST['limitClause'];
$orderClause = $_REQUEST['orderClause'];
$likeClause = $_REQUEST['likeClause'];

$sql ="select pid, otherID, pname, description, tstamp, voteplus, voteminus  from `taxplans`" . $whereClause .  $likeClause . $orderClause . $limitClause ;
$rs = $db->query($sql);
//$allr = [];
ChromePhp::log($sql);
while ($row = $rs->fetch_assoc()){
	ChromePhp::log($row);
	$allr[] = $row;
}
//$allrs = json_encode($rs->fech_all());
ChromePhp::log($allr);
$allrs = "ducks";
$jallr = json_encode($allr);
ChromePhp::log($jallr);

echo '{"items": ' . $jallr . '}';
$mes= "heres a well formed json";
//echo '{"items":[{"message": "' . $mes . '"}]}'; 
?>