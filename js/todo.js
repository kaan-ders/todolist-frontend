var todolist = [];

function ekle() { 
	var todo = {
		id: generateGuid(),
		isCompleted: false
	};
	
	todo.title = $('#txtTodo').val();
	
	if(todo.title == '') {
		alert("todo boş olamaz");
		return;
	}
	
	todolist.push(todo);
	
	//tabloya satır eklemek
	
	satirEkle(todo);
	$('#txtTodo').val('');
	
	kaydet();
}

function satirEkle(todo) {	
	var row = `<tr id="tr_` + todo.id + `">
				<td>
					<div class="form-check">
					  <input ` + (todo.isCompleted ? 'checked' : '') + ` class="form-check-input" type="checkbox" onclick="tamamlandi('`+todo.id+`')">
					</div>
				</td>
				<td>` + todo.title + `</td>
				<td>
					<button type="button" class="btn btn-link btn-sm" onclick="sil('`+todo.id+`');">sil</button>
				</td>
			</tr>`;
	
	$('#tblTodo > tbody:last-child').append(row);
	tamamlandiMiKontrol(todo);
}

function sil(id) {
	if(confirm("Emin misiniz?") == false)
		return;
	
	$("#tr_" + id).remove();
	
	for(var i = 0; i < todolist.length; i++)
	{
		if(todolist[i].id === id)
		{
			todolist.splice(i, 1);
			break;
		}
	}
	
	kaydet();
}

function tamamlandi(id) {
	for(var i = 0; i < todolist.length; i++)
	{
		if(todolist[i].id === id)
		{
			/*if(todolist[i].isCompleted == true)
				todolist[i].isCompleted == false;
			else
				todolist[i].isCompleted == true;*/
			
			todolist[i].isCompleted = !todolist[i].isCompleted;
			tamamlandiMiKontrol(todolist[i]);
			
			break;
		}
	}
	
	kaydet();
}

function tamamlandiMiKontrol(todo) {
	var tr = $('#tr_' + todo.id);
	
	if(todo.isCompleted)
		tr.addClass('text-muted text-decoration-line-through fst-italic');
	else
		tr.removeClass('text-muted text-decoration-line-through fst-italic');
}

function kaydet() {
	localStorage.removeItem('todolist');
	localStorage.setItem("todolist", JSON.stringify(todolist));
}

function listeyiDoldur(list) {
	var listeJson = localStorage.getItem("todolist");
	todolist = JSON.parse(listeJson);
	
	tabloyuDoldur();
}

function tabloyuDoldur() {
	for(var i = 0; i < todolist.length; i++)
	{
		satirEkle(todolist[i]);
	}
}

function sadeceTamamlananlar() {
	if($('#chkTamamlanmayanlar').is(':checked'))
	{
		//sadece tamamlananlar
		for(var i = 0; i < todolist.length; i++)
		{
			if(todolist[i].isCompleted)
			{
				$("#tr_" + todolist[i].id).remove();
			}
		}
	}
	else
	{
		 $('#tblTodo tbody').empty();
		 tabloyuDoldur();
	}
}

$(document).ready(function () {
	listeyiDoldur();
});