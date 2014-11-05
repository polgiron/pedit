<?php
    session_start();

    if (isset($_POST['coMdp']) && $_POST['coMdp'] == 'eve')
	{
		$_SESSION['logged'] = 1;
		echo 1;
	}
	else
	{
		$_SESSION['logged'] = 0;
		echo 0;
	}