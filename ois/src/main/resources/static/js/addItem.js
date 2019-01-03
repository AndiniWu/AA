function addItem(){
    return `<span class="title1"><b class="bold1">A</b>DD<b class="bold1">N</b>EW<b class="bold1">I</b>TEM</span>
	    	<div class="col-md-9">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Id</label>
			    	</div>
			    	<div class="col-md-6">
			    		<input id="id" type="text" class="form-control" name="id" maxlength="11" disabled="true">
			    	</div>
			    	<div class="col-md-3"></div>
			    </div>
	    	<form class="formItem">			 
			    <div class="col-md-9"></div>
			    <div class="col-md-9">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Name*</label>
			    	</div>
			    	<div class="col-md-6">
			    		<input id="name" type="text" class="form-control" name="name" maxlength="50" required>
			    	</div>
			    	<div class="col-md-3"></div>
			    </div>
			    <div class="col-md-9"></div>
			    <div class="col-md-9">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Qty*</label>
			    	</div>
			    	<div class="col-md-6">
			    		<input id="quantity" type="number" class="form-control" min="1" max="9999" maxlength="4" oninput="minMaxCheck(this)" name="quantity" required>
			    	</div>
			    	<div class="col-md-3"></div>
			    </div>
			    <div class="col-md-9"></div>
			    <div class="col-md-9">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Price*</label>
			    	</div>
			    	<div class="col-md-6">
			    		<input id="price" type="number" class="form-control" name="price" required>
			    	</div>
			    	<div class="col-md-3"></div>
			    </div>
			    <div class="col-md-9"></div>
			    <div class="col-md-9">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Detail*</label>
			    	</div>
			    	<div class="col-md-6" style="float: left;">
			    		<textarea id="detail" class="form-control" name="detail" required></textarea>
			    	</div>
			    	<div class="col-md-3"></div>
			    </div>
			    <div class="col-md-9 wrap" style="margin-top: 7%;">
			    	<div class="col-md-3">
			    		<label class="col-form-label">Image*</label>
			    	</div>
			    	<div class="col-md-6">
			    		<input id="image" accept=".jpg,.png,.gif,.bmp" type="file" name="image" required>
			    	</div>
			    </div>
			    <div class="col-md-9">
			    	<div class="col-md-3"></div>
				    <div class="col-md-6" style="margin-top: 7%;">
				    	<button id="saveItem" type="submit" class="btn btn-success">SUBMIT</button>
				    	<button id="reset" type="reset" class="btn btn-warning">RESET</button>
				    	<button class="btn btn-primary" onclick="window.location.href='index'">BACK</button>
				    </div>
				    <div class="col-md-3"></div>
			    </div>
			    
			</form>`;
}