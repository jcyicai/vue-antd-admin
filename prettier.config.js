module.exports = {
	printWidth: 100, // 行长度
	tabWidth: 2,
	useTabs: true,
	semi: false, // 使用分号
	singleQuote: true, // 使用单引号
	trailingComma: 'none', // 行尾逗号,默认none,可选 none|es5|all,es5 包括es5中的数组、对象,all 包括函数对象等所有可选
	jsxBracketSameLine: false,
	jsxSingleQuote: false,
	arrowParens: 'always', // 箭头函数参数括号，默认avoid 可选 avoid| always,avoid 能省略括号的时候就省略 例如x => x，always 总是有括号
	endOfLine: 'lf',
	vueIndentScriptAndStyle: false, // vue文件脚本和样式标签缩进
	quoteProps: 'as-needed',
	bracketSpacing: true, // 在对象文字中的括号之间打印空格
	htmlWhitespaceSensitivity: 'strict',
	rangeStart: 0
}
