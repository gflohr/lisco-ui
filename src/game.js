import { Chessground } from 'chessground';
import Chess from 'chess.js';
import { timestamp } from './util';

export default {
	function() {
		const started = false;
		const now = timestamp();
		const chess = new Chess();
		const ground = new Chessground();
	}
}