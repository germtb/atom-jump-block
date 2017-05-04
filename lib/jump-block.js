atom.commands.add('atom-text-editor', 'jump-block:up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.setBufferPosition([previousBlockRow(buffer, cursor.getBufferRow()), 0]);
		cursor.moveToFirstCharacterOfLine();
	});
});

atom.commands.add('atom-text-editor', 'jump-block:extend-up', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.selection.selectToBufferPosition([previousBlockRow(buffer, cursor.getBufferRow()), 0]);
	});
});

atom.commands.add('atom-text-editor', 'jump-block:down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.setBufferPosition([nextBlockRow(buffer, cursor.getBufferRow()), 0]);
		cursor.moveToFirstCharacterOfLine();
	});
});

atom.commands.add('atom-text-editor', 'jump-block:extend-down', () => {
	const editor = atom.workspace.getActiveTextEditor();
	const buffer = editor.getBuffer();
	const cursors = editor.cursors;
	cursors.forEach(cursor => {
		cursor.selection.selectToBufferPosition([endOfBlockRow(buffer, cursor.getBufferRow()), 0]);
	});
});

function previousBlockRow(buffer, row) {
	if (row <= 0) {
		return 0;
	}

	for (let i = row - 2; i >= 0; i = i - 1) {
		if (buffer.lines[i].match(/^\s*$/) && !buffer.lines[i + 1].match(/^\s*$/)) {
			return i + 1;
		}
	}

	return 0;
}

function nextBlockRow(buffer, row) {
	if (row >= buffer.lines.length - 1) {
		return buffer.lines.length - 1;
	}

	for (let i = row; i < buffer.lines.length; i++) {
		if (buffer.lines[i].match(/^\s*$/)) {
			if (buffer.lines[i + 1].match(/^\s*$/)) {
				continue;
			} else {
				return i + 1;
			}
		}
	}

	return buffer.lines.length - 1;
}

function endOfBlockRow(buffer, row) {
	if (row >= buffer.lines.length - 1) {
		return buffer.lines.length - 1;
	}

	for (let i = row + 1; i < buffer.lines.length; i++) {
		if (buffer.lines[i].match(/^\s*$/)) {
			if (buffer.lines[i + 1].match(/^\s*$/)) {
				continue;
			} else {
				return i;
			}
		}
	}

	return buffer.lines.length - 1;
}
