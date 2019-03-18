import UCIEngineManager from 'chess-tools/engines/uci';

export default class UCIEngine extends UCIEngineManager {
	constructor(engine, options) {
		super(engine, options);

		// FIXME! This should also be sent, when a new game is started.
		this._sendMessage("ucinewgame");
	}
	async go(fen, options) {
		return new Promise((resolve, reject) => {
			const options_string = makeGoOptionsString(options);
			this._clear_stats();

			const messages = [];
			if (this.engine_info.options.UCI_ShowCurrLine) {
				this.engine_info.options.UCI_ShowCurrLine.value = true;
				messages.push(this.engine_info.options.UCI_ShowCurrLine.generateMesssage())
			}
			if (options.lines && this.engine_info.options.MultiPV) {
				if (options.lines <= this.engine_info.options.MultiPV.max ) {
					this.engine_info.options.MultiPV.value = options.lines;
					messages.push(this.engine_info.options.MultiPV.generateMesssage())
				} else {
					throw new Error("Number of lines requested exceeds engine max",
					                this.engine_info.options.MultiPV.max);
				}
			}

			messages.push("position fen " + fen);
			messages.push("go " + options_string);
			this.state.is_calculating = true;
			for (let m of messages) {
				this._sendMessage(m);
			}
			this.current_position.fen = fen;
			this.current_position.resolve = resolve;
			this.current_position.reject = reject;
		});
	}
};

function makeGoOptionsString(options) {
	let options_options = [];

	if (options.searchmoves) {
		if (typeof options.searchmoves === 'object'
			&& Array.isArray(options.searchmoves) ) {
			options_options.push('searchmoves ' + options.searchmoves.join(' '));
		}
	}
	if (options.wtime) {
		options_options.push('wtime ' + options.wtime)
	}
	if (options.btime) {
		options_options.push('btime ' + options.btime);
	}
	if (options.winc) {
		options_options.push('winc ' + options.winc);
	}
	if (options.binc) {
		options_options.push('binc ' + options.binc);
	}
	if (options.movestogo) {
		options_options.push('movestogo ' + options.movestogo);
	}
	if (options.depth) {
		options_options.push('depth ' + options.depth);
	}
	if (options.nodes) {
		options_options.push('nodes ' + options.nodes);
	}
	if (options.mate) {
		options_options.push('mate ' + options.mate);
	}

	return options_options.join(' ');
}