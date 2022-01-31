
function toQuery() {
  window.location = 'Query.html';
}

function toNotes() {
 window.location = 'index.html';
}

function extractData() {
    var t = document.querySelector('#title').value;
    var c = document.querySelector('#content').value;
    var n = {
            title: t,
            content: c,
            date: new Date()
    };
    var o = JSON.parse(localStorage.getItem("notes")) || [];
    o.push(n);
    localStorage.setItem("notes", JSON.stringify(o));
    toNotes();    
}

function flushStorage() {
  localStorage.removeItem("notes");
}

function showData() {
  var o = JSON.parse(localStorage.getItem("notes")) || [];
  o.forEach( function(o) {
     alert(o.title);
    // alert(o.date);
  }) 
}

function deleteData(d) {
   var o = JSON.parse(localStorage.getItem("notes")) || [];
   var i = 0;
   while( o[i] !== null ) {
     if( o[i].date === d ) {
       o.splice(i,1);
       localStorage.setItem("notes", JSON.stringify(o));
      printData();
     }
    i = i + 1;  
   }  
}

function printData() {
      var o = JSON.parse(localStorage.getItem("notes")) || [];
      var notebook = document.getElementById("notebook");
      notebook.innerHTML = null;  
   
      o.forEach( function(o) {
        var note = document.createElement("div");
        note.className = "note";
        var postit = document.createElement("div");
        postit.className = "post";
        var title = document.createElement("h3");
        title.className = "title";
        title.innerHTML = o.title;
        postit.appendChild(title);
        var date = document.createElement("p");
        date.className = "date";
        date.innerText = o.date;
        var d = o.date;
        postit.appendChild(date);
        var content = document.createElement("p");
        content.className = "content";
        content.innerText = o.content; 
        postit.appendChild(content); 
        var del = document.createElement("button");
        del.className = "delete";
        del.innerText = "X";
        del.onclick = function () { deleteData(o.date); };
        note.appendChild(postit);
        note.appendChild(del);
        notebook.appendChild(note);
      })
}

