/**
 * general topological sort
 * 
 * @param Array<Array> edges : list of edges. each edge forms Array<ID,ID> e.g. [12 , 3]
 *
 * @returns Array : topological sorted list of IDs
 **/

 export function tsort(edges) {
    var nodes   = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
        sorted  = [], // sorted list of IDs ( returned value )
        visited = {}; // hash: id of already visited node => true
  
    var Node = function(id) {
      this.id = id;
      this.afters = [];
    }
  
    // 1. build data structures
    edges.forEach(function(v) {
      var from = v[0], to = v[1];
      if (!nodes[from]) nodes[from] = new Node(from);
      if (!nodes[to]) nodes[to]     = new Node(to);
      nodes[from].afters.push(to);
    });
  
    // 2. topological sort
    Object.keys(nodes).forEach(function visit(idstr, ancestors) {
      var node = nodes[idstr],
          id   = node.id;
  
      // if already exists, do nothing
      if (visited[idstr]) return;
  
      if (!Array.isArray(ancestors)) ancestors = [];
  
      ancestors.push(id);
  
      visited[idstr] = true;
  
      node.afters.forEach(function(afterID) {
        if (ancestors.indexOf(afterID) >= 0)  // if already in ancestors, a closed chain exists.
          throw new Error('closed chain : ' +  afterID + ' is in ' + id);
  
        visit(afterID.toString(), ancestors.map(function(v) { return v })); // recursive call
      });
  
      sorted.unshift(id);
    });
  
    return sorted;
  }

  function tsortTest() {
  
    // example 1: success
    var edges = [
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4]
    ];
  
    var sorted = tsort(edges);
    console.log(sorted);
  
    // example 2: failure ( A > B > C > A )
    edges = [
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'A']
    ];
  
    try {
      sorted = tsort(edges);
    }
    catch (e) {
      console.log(e.message);
    }
  }