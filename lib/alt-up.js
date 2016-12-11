atom.commands.add('atom-text-editor', 'alt-up:up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const row = editor.getCursorScreenPosition().row;

	editor.setCursorBufferPosition([previousBlockRow(buffer, row), 0]);
	editor.moveToFirstCharacterOfLine();
});

atom.commands.add('atom-text-editor', 'alt-up:extend-up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const row = editor.getCursorScreenPosition().row;

	editor.selectToBufferPosition([previousBlockRow(buffer, row), 0]);
});

atom.commands.add('atom-text-editor', 'alt-up:down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const row = editor.getCursorScreenPosition().row;

	editor.setCursorBufferPosition([nextBlockRow(buffer, row), 0]);
	editor.moveToFirstCharacterOfLine();
});

atom.commands.add('atom-text-editor', 'alt-up:extend-down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const row = editor.getCursorScreenPosition().row;

	editor.selectToBufferPosition([nextBlockRow(buffer, row), 0]);
});

function previousBlockRow(buffer, row) {
	if (row <= 0) {
		return 0;
	}

	for (let i = row - 1; --i; i >= 0) {
		if (buffer.lines[i] === "" && buffer.lines[i + 1] !== "") {
			return i + 1;
		}
	}

	return 0;
}

function nextBlockRow(buffer, row) {
	if (row >= buffer.lines.length - 1) {
		return buffer.lines.length - 1;
	}

	for (let i = row; ++i; i < buffer.lines.length) {
		if (buffer.lines[i] === "") {
			if (buffer.lines[i + 1] === "") {
				continue;
			} else {
				return i + 1;
			}
		}
	}

	return buffer.lines.length - 1;
}
