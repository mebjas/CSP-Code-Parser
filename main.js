var doc;
var js = '';
var _idprefix = 'mebjas';
var _count = 1;

var events = ['click', 'dblclick', 'submit', 'keyup', 'keydown', 'keypress', 'mouseon', 'blur', 'focus', 'load', 'mouseover', 'mouseout'];

function returnJSCode(classname, listner, func) {
	var js = "document.getElementsByClassName('" +classname +"')[0].addEventListener('" +listner +"', function() {";
		js += func;
		js +="});";
	return js;
}

function parseNode(node) {
	if (node.childNodes) {
		for (var i = 0; i < node.childNodes.length; i++) {
			parseNode(node.childNodes[i]);
		}
	}

	for (var i = 0; i < events.length; i++) {
		if (node['on' +events[i]]) {
			var classname = _idprefix + (_count++)
			if (node.className == '')
				node.className = classname;
			else {
				if (node.className.indexOf(_idprefix) != -1) {
					// More than one listener in one node
					var r = new RegExp(_idprefix +"[0-9]{1,}");
					classname = r.exec(node.className);
					_count--;
				} else 
					node.className += ' ' +classname;
			}

			js += returnJSCode(classname, events[i], node['on' +events[i]]);
			js += "\n";

			node.removeAttribute('on' +events[i]);
		}
	}
}

doc = document;
parseNode(doc);
