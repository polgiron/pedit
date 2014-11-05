<!-- LOGGED -->
<?php if(isset($_SESSION['logged']) && $_SESSION["logged"] === 1): ?>
	<div id="peditAdminLoggedWrapper">
		<div id="peditAdminLoggedContent" class="clearfix">
			<p id="peditAdminText">Administration du site</p>
			<div id="peditAdminLoggedRight">
				<p id="peditVersion">pedit v<?php echo $peditVersion; ?></p>
				<p class="peditDecoLauncher">Déconnexion</p>
			</div>
		</div>
	</div>
<?php endif; ?>

<!-- BACK -->
<div id="peditBack"></div>

<!-- CONNEXION -->
<div id="peditCoWrapper" class="peditPopup peditPopupFixed bgWhiteShadow">
	<h1>Connexion Admin</h1>
	<form class="clearfix">
		<input type="password" placeholder="Mot de passe admin" id="peditCoMdp">
		<input type="submit" value="Valider" class="peditButton peditButtonConfirm">
	</form>
	<div class="peditClosePopupPopup peditClosePopup"></div>
</div>