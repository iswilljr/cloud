const first = { color: "#ff7b72" };
const second = { color: "#d2a8ff" };
const third = { color: "#79c0ff" };
const fourth = { color: "#a5d6ff" };
const fifth = { color: "#ffa657" };
const sixth = { color: "#8b949e" };
const seventh = { color: "#7ee787" };

const obj: {
	[key: string]: React.CSSProperties;
} = {
	hljs: {
		color: "#c9d1d9",
		background: "#0d1117",
	},
	"hljs-doctag": first,
	"hljs-keyword": first,
	"hljs-meta hljs-keyword": first,
	"hljs-template-tag": first,
	"hljs-template-variable": first,
	"hljs-type": first,
	"hljs-variablelanguage_": first,
	"hljs-title": second,
	"hljs-titleclass_": second,
	"hljs-titleclass_inherited__": second,
	"hljs-titlefunction_": second,
	"hljs-attr": third,
	"hljs-attribute": third,
	"hljs-literal": third,
	"hljs-meta": third,
	"hljs-number": third,
	"hljs-operator": third,
	"hljs-selector-attr": third,
	"hljs-selector-class": third,
	"hljs-selector-id": third,
	"hljs-variable": third,
	"hljs-meta hljs-string": fourth,
	"hljs-regexp": fourth,
	"hljs-string": fourth,
	"hljs-built_in": fifth,
	"hljs-symbol": fifth,
	"hljs-code": sixth,
	"hljs-comment": sixth,
	"hljs-formula": sixth,
	"hljs-name": seventh,
	"hljs-quote": seventh,
	"hljs-selector-pseudo": seventh,
	"hljs-selector-tag": seventh,
	"hljs-subst": {
		color: "#c9d1d9",
	},
	"hljs-section": {
		color: "#1f6feb",
		fontWeight: 700,
	},
	"hljs-bullet": {
		color: "#f2cc60",
	},
	"hljs-emphasis": {
		color: "#c9d1d9",
		fontStyle: "italic",
	},
	"hljs-strong": {
		color: "#c9d1d9",
		fontWeight: 700,
	},
	"hljs-addition": {
		color: "#aff5b4",
		backgroundColor: "#033a16",
	},
	"hljs-deletion": {
		color: "#ffdcd7",
		backgroundColor: "#67060c",
	},
};

export default obj;
