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
	function printEdge(node2, weight) {
		var options = " [dir=back ";
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
		return this.printNode() + " -> " + node2.printNode() + options + ";\n"; 
	}
	function printEdgeShort(node2, weight) {
		var options = " [dir=back ";
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
		return "\"" + this.name + "\" -> \"" + node2.name + "\"" + options + ";\n";
	}
}
function bfs(graph, course){
	ans2 = "digraph G {\n";
	traversedNodes=[];
	traversedNodes.push(course);
	allNodes=graph.getAllNodes();
	marked={};
	if (!document.getElementById("notrans").checked) {
		for (var i = 0; i < graph.marked.length; i++) {
			marked[graph.marked[i]] = true;
		}
	}
	
	if (document.getElementById("flip").checked) 
		ans2 += "rankdir=BT;\n";
	
	
	while(traversedNodes.length!=0){
		var v=traversedNodes.shift();
		//if (marked[v.name]) continue;
		marked[v.name]=true;
		//ans.push(v.toString());
		adjList=v.adjList;
		for (var i=0;i<adjList.length;i++){
			u=adjList[i];
			//console.log(v.printEdge(u, v.weight[i]));
			ans2 += v.printEdge(u, v.weight[i]);
			if(marked[u.name]!=true){
				traversedNodes.push(u);
				marked[u.name]=true;

			}
		}			
	}
	
	
	
	ans2 += "}";
	//console.log(ans2);
	return ans2;
}


function dfs(graph){
	ans="digraph G {\n";
	traversedNodes=graph.getAllNodes();
	//traversedNodes.push(graph.nodes[0]);
	allNodes=graph.getAllNodes();
	marked={};
	
	ans += "rankdir=LR;\n";
	
	
	while(traversedNodes.length!=0){
		var v=traversedNodes.pop();
		if (marked[v.name] == true) continue;
		marked[v.name]=true;
		adjList=v.adjList;
		//console.log(v);
		
		for (var i=0;i<adjList.length;i++){
			u=adjList[i];
			ans += v.printEdgeShort(u, v.weight[i]);
			if(marked[u.name]!=true){
				traversedNodes.push(u);
				marked[u.name]=true;
			}
		}			
	}
	ans+= "}";
	return ans;
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


function dijkstra(graph,source,destination){

	this.previousNode=[];
	this.distance=new Array();				
	this.distance[source.name]=0;
	this.pq=new MinPQ();
	var nodes=graph.getAllNodes();
	length=nodes.length;
	for(var i=0;i<length;i++){
		if(nodes[i]!=source){
			this.distance[nodes[i].name]=Number.POSITIVE_INFINITY;
		}
        this.pq.push(nodes[i],this.distance[nodes[i].name]);
	}
	
	while(this.pq.size()!=0){
		u=this.pq.pop();
		adjList=u.adjList;
		for (var i = 0; i < adjList.length; i++) {
			v=adjList[i];
			if(this.distance[u.name]!=Number.POSITIVE_INFINITY){
				alt=this.distance[u.name]+u.weight[i];
				if(alt<this.distance[v.name]){
					this.distance[v.name]=alt;
					this.previousNode[v.name]=u.name;
                    this.pq.remove(v);
                    this.pq.push(v,this.distance[v.name]);
				}
			}
		}
	}
	if(typeof destination==='undefined'){

	}else 
	return this.distance[destination.name];
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