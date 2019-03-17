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
				<player-info piece-color="black" component-position="top"/>
				<player-info piece-color="white" component-position="bottom"/>
			</div>
			<div class="board blue merida" id="board" ref="board">
				<chess-board :ready="boardReady" :move="move"/>
			</div>
			<div class="moves"><move-table/></div>
			<div class="info-area">
				<div class="toolbar"><h1 class="title">Information</h1></div>
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
import ChessBoard from './components/ChessBoard.vue';
import PlayerInfo from './components/PlayerInfo.vue';
import MoveTable from './components/MoveTable.vue';

export default {
	name: 'app',
	data: function data() {
		return {
			boardReady: false,
			// FIXME! This can be removed, when the chessground object is
			// moved into the state store.
			move: undefined,
		};
	},
	components: {
		ChessBoard,
		PlayerInfo,
		MoveTable,
	},
	async mounted() {
		try {
			const options = {
				white: {
					color: 'w',
					name: 'Stockfish',
					connection: 'local',
					manager: 'UCI',
					path: 'stockfish',
				},
				black: {
					color: 'b',
					name: 'Ethereal',
					connection: 'local',
					manager: 'UCI',
					path: 'ethereal',
				},
			};
			await this.$store.dispatch('game/start', options);
			this.boardReady = true;

			await this.$store.dispatch('game/move');
		} catch (e) {
			alert(`Starting players failed: ${e}`);
		}
	},
	computed: {
		lastMove: {
			get: function get() {
				return this.$store.state.game.move;
			},
		},
	},
	watch: {
		lastMove: function lastMoveChanged(move) {
			this.move = move;
			const chess = this.$store.state.game.chess;
			if (chess.game_over()) {
				// FIXME! Be more specific.
				alert("Game over!");
				return;
			}
		},
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
