//@author devenbhooshan

function Graph(){
	this.isWeighted=false;
	this.nodes=[]
	this.marked = [];
	this.addNode=addNode;
	this.removeNode=removeNode;
	this.nodeExist=nodeExist;
	this.getAllNodes=getAllNodes;
	this.getNode=getNode;
	
	
	function addNode(Name, Title, Desc){
		temp=new Node(Name, Title, Desc);
		this.nodes.push(temp);
		return temp;
	}
	function removeNode(Name){
		
		index=this.nodes.indexOf(Name);
		if(index>-1){
			this.nodes.splice(index,1);
			len=this.nodes.length;

			for (var i = 0; i < len; i++) {
				if(this.nodes[i].adjList.indexOf(Name)>-1){
					this.nodes[i].adjList.slice(this.nodes[i].adjList.indexOf(Name));
					this.nodes[i].weight.slice(this.nodes[i].adjList.indexOf(Name));
				}
			}
		}
		
	}
	function nodeExist(Name){
		index=this.nodes.indexOf(Name);
		if(index>-1){
			return true;
		}
		return false;
	}
	
	function getNode(Name) {
		
		for(var i = 0; i < this.nodes.length; i++) {
			if (Name == this.nodes[i].name) {
				return this.nodes[i];
			}
		}
		return null;
	}

	function getAllNodes(){
		return this.nodes.slice();
	}
	
	function getBFSTravaersal(){

	}

	function getBFSTravaersal(){
		
	}
	
	function getBFSTravaersal(){
		
	}

}

function Node(Name, Title, Desc){
	this.name=Name;
	this.desc = Desc;
	this.title = Title;
	this.adjList=[];
	this.weight=[];
	this.addEdge=addEdge;
	this.compare=compare;
	this.toString=toString;
	this.printEdge=printEdge;
	this.printEdgeShort=printEdgeShort;
	this.printNode=printNode;
	this.printWeight=printWeight;

	function addEdge(neighbour,weight){
		this.adjList.push(neighbour);
		this.weight.push(weight);	
	}
	
	function getAdjList(){
		return adjList;
	}
	function compare(node2){
		return this.weight-node2.weight;
	}
	function toString() {
		return this.name + " " + this.title;
	}
	function printNode() {
		return "\"" + this.name + "\\n" + this.title + "\"";
	}
	function printWeight(weight) {
		var options = " [";
		//console.log(weight);
		switch(weight) {
			case 0:
				options += " style=dashed color=red]";
				break;
			case 1:
				options += " color=red]";
				break;
			case 2:
				options += " color=blue]";
				break;
			case 3:
				options += " color=green]";
				break;
			case 4:
				options += " style=dashed color=green]";
				break;
			default: 
				options += "]";
		}
		
		return options;
	}
	function printEdge(node2, weight) {
		var options = printWeight(weight);
		return this.printNode() + " -> " + node2.printNode() + options + ";\n"; 
	}
	function printEdgeShort(node2, weight) {
		var options = printWeight(weight);
		return "\"" + this.name + "\" -> \"" + node2.name + "\"" + options + ";\n";
	}
}
function bfs(graph, course){
	//ans2 = "digraph G {\n";
	declarations = "digraph G {\n";
	nodeList = "";
	edgeList = "";
	rankList = "";
	traversedNodes=[];
	ranks = [];
	rankMap = {};
	traversedNodes.push(course);
	ranks.push(0);
	dijks = [];
	//allNodes=graph.getAllNodes();
	marked={};
	if (document.getElementById("notrans").checked) {
	}
	else {
		
		for (var i = 0; i < graph.marked.length; i++) {
			marked[graph.marked[i]] = true;
		}
	}
	
	if (document.getElementById("flip").checked) 
		declarations += "rankdir=BT;\n";

	
	declarations += "dirType=back;\n";
	
	declarations += "dpi=70;\n";
	
	declarations += "splines=curved;\n";
	declarations += "splines=true;\n";
	declarations += "nodesep=0.1;\n";
	declarations += "node [fontsize=9 width=3 fixedsize=true];\n";
	
	while(traversedNodes.length!=0){
		var v=traversedNodes.shift();
		dijks.push(v);
		var r = ranks.shift();
		//if (marked[v.name]) continue;
		marked[v.name]=true;
		adjList=v.adjList.slice();
		
		//declaring and labeling all nodes
		nodeList += "\"" + v.name + "\"" + " [label=" + v.printNode() + "];\n";
		
		for (var i=0;i<adjList.length;i++){
			bu=adjList[i];
			edgeList += v.printEdgeShort(bu, v.weight[i]);
			if(marked[bu.name]!=true){
				traversedNodes.push(bu);
				marked[bu.name]=true;
			}
			else{
				// catches unlabled and untraversed nodes from transcripts
				if (!(new RegExp(bu.name)).test(nodeList)) {
					nodeList += "\"" + bu.name + "\"" + " [label=" + bu.printNode() + "];\n";
				}
			}
		}			
	}
	
	// gets longest path to a course for the rank tier
	if (document.getElementById("tier").checked) {
		var longest = dijkstra(graph, course, dijks);
		for (var c in longest) {
			if (!rankMap[longest[c]]) rankMap[longest[c]] = "";
			rankMap[longest[c]] += "\"" + c + "\"; ";
		}
		
		for (var rank in rankMap) {
			rankList += "{rank = same; " + rankMap[rank] + "};\n";
		}
	}
	return declarations + nodeList + rankList  + edgeList + "}";
}


function dfs(graph){
	ans="digraph G {\n";
	declarations = "digraph G {\n";
	nodeList = "";
	edgeList = "";
	traversedNodes=graph.getAllNodes();
	allNodes=graph.getAllNodes();
	
	declarations += "dirType=back;\n";
	
	declarations += "dpi=50;\n";
	declarations += "edge [penwidth=.3 arrowsize=.8];\n";
	declarations += "node [shape=ellipse filled=true fillcolor=white];\n";
	declarations += "splines=curved;\n";
	declarations += "ranksep=4;\n";
	declarations += "overlap=false;\n";
	declarations += "outputorder=nodefirst;\n";
	
	
	while(traversedNodes.length!=0){
		var v=traversedNodes.pop();
		adjList=v.adjList;
		for (var i=0;i<adjList.length;i++){
			nodeList += "\"" + v.name + "\";\n";
			u=adjList[i];
			edgeList += v.printEdgeShort(u, v.weight[i]);
		}			
	}
	
	return declarations + nodeList + edgeList + "}";
}

function binaryHeap(){
	this.nodes=[];
}

binaryHeap.prototype.size=function(){
		return this.nodes.length;
};

binaryHeap.prototype.compare = function(node1,node2) {
	return node1.priority-node2.priority;
};
binaryHeap.prototype.insert_push = function(element) {
	this.nodes.push(element);
	this.bubbleUp(this.nodes.length-1);
};

binaryHeap.prototype.remove_pop = function() {
	var ans=this.nodes[0];
	var last_element=this.nodes.pop();
	
	if(this.nodes.length> 0){
		this.nodes[0]=last_element;
		this.sinkDown(0);
	}
	return ans;
};

binaryHeap.prototype.delete_node = function(node) {
	var length=this.nodes.length;
	isPresent=false;
	for (var i = 0; i < length; i++) {
		if((this.nodes[i].content!=node)) continue;
		var end=this.nodes.pop();
		if(i==length-1) break;
		this.nodes[i]=end;
		this.bubbleUp(i);
		this.sinkDown(i);
		isPresent=true;
		break;
	}
	return isPresent;
};

binaryHeap.prototype.top = function() {
	return this.nodes[0];
};

binaryHeap.prototype.sinkDown = function(i) {
	var length=this.nodes.length;	
	while(true && i<length){
		var flag=0;
		if(2*i+1 < length && this.compare(this.nodes[i],this.nodes[2*i+1])>0){
			if(2*i+2< length && this.compare(this.nodes[2*i+1],this.nodes[2*i+2])>0){
				flag=2;
			}else{
				flag=1;
			}	
		}else if( 2*i+2 < length && this.compare(this.nodes[i],this.nodes[2*i+2])>0){
			flag=2;
		}else {
			break;
		}
			var temp=this.nodes[2*i+flag];
			this.nodes[2*i+flag]=this.nodes[i];
			this.nodes[i]=temp;
			i=2*i+flag;
	}
};


binaryHeap.prototype.bubbleUp = function(i) {
	
	var length=this.nodes.length;	
	while(i>0){
		var index=Math.floor((i+1)/2)-1;
		//console.log(this.compare(this.nodes[i],this.nodes[index]));
		if(this.compare(this.nodes[i],this.nodes[index])<0){
			//console.log(this.nodes[i].priority+' '+this.nodes[index].priority);
			var temp=this.nodes[index];
			this.nodes[index]=this.nodes[i];
			this.nodes[i]=temp;
			i=index;
		}else {
			break;
		}
			
	}
};


function MinPQ(list){
	
	bh=new binaryHeap();
	this.heap=bh;
}

MinPQ.prototype.push=function(node,priority){
	var temp=new MinPQNodes(node,priority);
	this.heap.insert_push(temp);
};

MinPQ.prototype.pop=function(){
	return this.heap.remove_pop().content;
};


MinPQ.prototype.remove=function(node){
	return this.heap.delete_node(node);
};

MinPQ.prototype.top=function(){
	return this.heap.top().content;
};
MinPQ.prototype.size=function(){
	return this.heap.size();
};

function MinPQNodes(content,priority){
	this.content=content;
	this.priority=priority;
}


function dijkstra(graph,source, givenNodes){

	this.previousNode=[];
	this.distance={};				
	this.distance[source.name]=0;
	this.pq=new MinPQ();
	var nodes=givenNodes;
	length=nodes.length;
	for(var i=0;i<length;i++){
		if(nodes[i]!=source){
			this.distance[nodes[i].name]=Number.NEGATIVE_INFINITY;
		}
        this.pq.push(nodes[i],this.distance[nodes[i].name]);
	}
	
	while(this.pq.size()!=0){
		u=this.pq.pop();
		badjList=u.adjList.slice();
		for (var i = 0; i < badjList.length; i++) {
			v=badjList[i];
			if(this.distance[u.name]!=Number.NEGATIVE_INFINITY){
				var weight = 1;
				if ( u.weight[i] > 2) {
					weight = 0;
				}
				alt=this.distance[u.name]+weight;
				if(alt>this.distance[v.name] && v.adjList.indexOf(u) < 0){
					this.distance[v.name]=alt;
					this.previousNode[v.name]=u.name;
                    this.pq.remove(v);
                    this.pq.push(v,this.distance[v.name]);
				}
			}
		}
	}
	return this.distance;
}

function bellman_ford(graph,source,destination){
	this.previousNode=[];
	this.distance=new Array();				
	this.distance[source.name]=0;
	var nodes=graph.getAllNodes();
	length=nodes.length;
	for(var i=0;i<length;i++){
		if(nodes[i]!=source){
			this.distance[nodes[i].name]=Number.POSITIVE_INFINITY;
		}
	}
	
	for(var k=0;k<length;k++){
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				if(this.distance[u.name]!=Number.POSITIVE_INFINITY){	
					alt=this.distance[u.name]+u.weight[i];
					if(alt<this.distance[v.name]){

						this.previousNode[v.name]=u.name;
						this.distance[v.name]=alt;
					}
				}
			}
		}
	}

	for(var j=0;j<length;j++){
		u=nodes[j];
		adjList=u.adjList;
		for (var i = 0; i < adjList.length; i++) {
			v=adjList[i];
			if(this.distance[u.name]!=Number.POSITIVE_INFINITY){	
				alt=this.distance[u.name]+u.weight[i];
				if(alt<this.distance[v.name]){
					return null;
				}
			}
		}
	}
	
	return this.distance[destination.name];	

}

function johnson(graph){
	try
	{
		// http://en.wikipedia.org/wiki/Johnson%27s_algorithm
		temp=new Node('temp');
		graph.addNode(temp);
		nodes=graph.getAllNodes();
		length=nodes.length;
		for(var j=0;j<length-1;j++){
			u=nodes[j];
			temp.addEdge(u,0);
		}
		vari=bellman_ford(graph,temp,temp);
		if(vari==null) {
			return null;
		}
		bell=new bellman_ford(graph,temp,temp);
		length=nodes.length;
		h=bell.distance;
		graph.removeNode(temp);		
		length=nodes.length;
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				u.weight[i]=u.weight[i]+h[u.name]-h[v.name];
			}
		}	
		distanceMatrix=new Array()
		length=nodes.length;
		for(var j=0;j<length;j++){
			u=nodes[j];
			list=u.weight;
			len=list.length;
			dij=new dijkstra(graph,nodes[j]);
			distanceMatrix[nodes[j].name]=dij.previousNode;
			
		}
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				u.weight[i]=u.weight[i]-h[u.name]+h[v.name];
			}
		}
	}
	catch(e)
	{
		console.log(e);
	}
	return distanceMatrix;	
}
//Minimum Spanning Tree

function prim(graph){

	nodes=graph.getAllNodes();
	this.error=false;
	this.Vnode=[];
	this.Vedge=[];
	this.Vnode.push(nodes[0]);

	this.pq=new MinPQ();
	
	this.InsertEdgeIntoPQ(nodes[0],this.pq)
	
	while(this.Vnode.length!=nodes.length){

		if(this.pq.size()==0){ 
			this.error=true;
			return ;
		}

		while(this.pq.size()!=0){

			minEdge=this.pq.pop();
			if(this.Vnode.indexOf(minEdge[1])==-1){

				this.Vedge.push(minEdge);
				this.Vnode.push(minEdge[1]);
				this.InsertEdgeIntoPQ(minEdge[1],this.pq);
				break;
			}

		}
	}
	return;
}

prim.prototype.InsertEdgeIntoPQ = function(node,pq) {
	adjList=node.adjList;
	wights=node.weight;
	for (var i = 0; i < adjList.length; i++) {
		temp=[];
		temp.push(node);
		temp.push(adjList[i]);
		pq.push(temp,wights[i]);		
	}
}