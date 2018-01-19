// The array object in JavaScript has a built in sorting.  This sorting method accepts a function as input which teaches the array what it should sort.

//For sorting a property in a object that is a number, use this idea.  It is assumed that a and b are objects of the same type; this way the dot notation works out.

thegivenarray.sort(function(a,b){
  return a.property - b.property
});


//For sorting a property in an object that is a string, use this idea.  It is assumed that a and b are strings, but we cannot assume what case they are in.

thegivenarray.sort(function(a,b){
  let wordA = a.property.toLowerCase();
  let wordB = b.property.toLowerCase();
  
  if(wordA < wordB){ return -1;}
  else if(wordA > wordB){ return 1;}
  else{ return 0;}
  
});

