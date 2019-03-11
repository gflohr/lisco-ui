<template>
	<div class="window">
		<div class="wrapper window-content">
			<header id="header" class="toolbar toolbar-header">
				<h1 class="title">Jane Appleseed vs. John Doe</h1>
				<div class="toolbar-actions">
					<div class="btn-group">
						<button class="btn btn-default">
							<span class="icon icon-home"></span>
						</button>
						<button class="btn btn-default">
							<span class="icon icon-folder"></span>
						</button>
					</div>
				</div>
			</header>
			<div class="player-infos">
				<div class="player-info player-info-top player-info-black">
					<div class="player-info-name">John Doe</div>
					<div class="icon icon-clock"></div>
					<div class="player-info-time-left">01:05:15</div>
					<div class="player-info-time-elapsed">01:03:12</div>
				</div>
				<div class="player-info player-info-bottom player-info-white">
					<div class="player-info-name">Jane Appleseed</div>
					<div class="icon icon-clock"></div>
					<div class="player-info-time-left">00:05:45</div>
					<div class="player-info-time-elapsed">00:07:48</div>
				</div>
			</div>
			<div class="board blue merida" id="board">
				<chessboard></chessboard>
			</div>
			<div class="moves">
				<table class="table-striped">
					<thead>
						<tr>
							<th class="toolbar"></th>
							<th class="toolbar"><h1 class="title">White</h1></th>
							<th class="toolbar"><h1 class="title">Black</h1></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>1</th>
							<td>e2-e4</td>
							<td>e7-e5</td>
						</tr>
						<tr>
							<th>2</th>
							<td>Ng1-f3</td>
							<td>Nb3-c6</td>
						</tr>
						<tr>
							<th>3</th>
							<td>Lf1-c4</td>
							<td>Lf8-c5</td>
						</tr>
						<tr>
							<th>4</th>
							<td>d2-d3</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="comment-area">
				<div class="toolbar"><h1 class="title">Comment</h1></div>
				<div>What a blunder!</div>
			</div>
		<footer id="footer" class="footer toolbar toolbar-footer">
				<div class="toolbar-actions">
					<input id="fen" type="text" disabled="disabled"
							size="120"
							value="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" />
					<button class="btn btn-default">
						Copy
					</button>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import { chessboard } from 'vue-chessboard';
import 'vue-chessboard/dist/vue-chessboard.css';

export default {
	name: 'app',
	components: {
		chessboard,
	},
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
