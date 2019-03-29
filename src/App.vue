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
				<position-display/>
			</footer>
		</div>
	</div>
</template>

<script>
import ChessBoard from './components/ChessBoard.vue';
import PlayerInfo from './components/PlayerInfo.vue';
import MoveTable from './components/MoveTable.vue';
import PositionDisplay from './components/PositionDisplay.vue';

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
		PositionDisplay,
	},
	created() {
		// Set default engines.
		this.$store.commit('config/setEngine', {
			name: 'Lozza',
			connection: 'worker',
			protocol: 'uci',
			path: '/lozza.js',
		});
		this.$store.commit('config/setEngine', {
			name: 'Stockfish.JS',
			connection: 'worker',
			protocol: 'uci',
			path: '/stockfish.js',
		});
		this.$store.commit('config/setEngine', {
			name: 'tomitankChess',
			connection: 'worker',
			protocol: 'uci',
			path: '/tomitankChess.js',
		});
		// Set default players.
		this.$store.commit('config/setPlayer', {
			type: 'human',
		});
		this.$store.commit('config/setPlayer', {
			type: 'engine',
			name: 'Lozza',
		});
		this.$store.commit('config/setPlayer', {
			type: 'engine',
			name: 'Stockfish.JS',
		});
		this.$store.commit('config/setPlayer', {
			type: 'engine',
			name: 'tomitankChess',
		});
	},
	async mounted() {
		try {
			const options = {
				white: {
					color: 'w',
					type: 'human',
				},
				black: {
					color: 'b',
					type: 'engine',
					name: 'Lozza',
					connection: 'worker',
					protocol: 'UCI',
					path: '/lozza.js',
				},
			};
			await this.$store.dispatch('game/start', options);
			this.boardReady = true;

			await this.$store.dispatch('game/move');
		} catch (e) {
			console.error(e);
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
			const { chess } = this.$store.state.game;
			if (chess.game_over()) {
				// FIXME! Be more specific.
				alert('Game over!');
				return;
			}

			this.$store.dispatch('game/move');
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
