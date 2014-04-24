(function(window){'use strict';function Controller(model,view){var that=this;that.model=model;that.view=view;that.view.bind('newTodo',function(title){that.addItem(title);});that.view.bind('itemEdit',function(item){that.editItem(item.id);});that.view.bind('itemEditDone',function(item){that.editItemSave(item.id,item.title);});that.view.bind('itemEditCancel',function(item){that.editItemCancel(item.id);});that.view.bind('itemRemove',function(item){that.removeItem(item.id);});that.view.bind('itemToggle',function(item){that.toggleComplete(item.id,item.completed);});that.view.bind('removeCompleted',function(){that.removeCompletedItems();});that.view.bind('toggleAll',function(status){that.toggleAll(status.completed);});}
Controller.prototype.setView=function(locationHash){var route=locationHash.split('/')[1];var page=route||'';this._updateFilterState(page);};Controller.prototype.showAll=function(){var that=this;that.model.read(function(data){that.view.render('showEntries',data);});};Controller.prototype.showActive=function(){var that=this;that.model.read({completed:false},function(data){that.view.render('showEntries',data);});};Controller.prototype.showCompleted=function(){var that=this;that.model.read({completed:true},function(data){that.view.render('showEntries',data);});};Controller.prototype.addItem=function(title){var that=this;if(title.trim()===''){return;}
that.model.create(title,function(){that.view.render('clearNewTodo');that._filter(true);});};Controller.prototype.editItem=function(id){var that=this;that.model.read(id,function(data){that.view.render('editItem',{id:id,title:data[0].title});});};Controller.prototype.editItemSave=function(id,title){var that=this;if(title.trim()){that.model.update(id,{title:title},function(){that.view.render('editItemDone',{id:id,title:title});});}else{that.removeItem(id);}};Controller.prototype.editItemCancel=function(id){var that=this;that.model.read(id,function(data){that.view.render('editItemDone',{id:id,title:data[0].title});});};Controller.prototype.removeItem=function(id){var that=this;that.model.remove(id,function(){that.view.render('removeItem',id);});that._filter();};Controller.prototype.removeCompletedItems=function(){var that=this;that.model.read({completed:true},function(data){data.forEach(function(item){that.removeItem(item.id);});});that._filter();};Controller.prototype.toggleComplete=function(id,completed,silent){var that=this;that.model.update(id,{completed:completed},function(){that.view.render('elementComplete',{id:id,completed:completed});});if(!silent){that._filter();}};Controller.prototype.toggleAll=function(completed){var that=this;that.model.read({completed:!completed},function(data){data.forEach(function(item){that.toggleComplete(item.id,completed,true);});});that._filter();};Controller.prototype._updateCount=function(){var that=this;that.model.getCount(function(todos){that.view.render('updateElementCount',todos.active);that.view.render('clearCompletedButton',{completed:todos.completed,visible:todos.completed>0});that.view.render('toggleAll',{checked:todos.completed===todos.total});that.view.render('contentBlockVisibility',{visible:todos.total>0});});};Controller.prototype._filter=function(force){var activeRoute=this._activeRoute.charAt(0).toUpperCase()+this._activeRoute.substr(1);this._updateCount();if(force||this._lastActiveRoute!=='All'||this._lastActiveRoute!==activeRoute){this['show'+activeRoute]();}
this._lastActiveRoute=activeRoute;};Controller.prototype._updateFilterState=function(currentPage){this._activeRoute=currentPage;if(currentPage===''){this._activeRoute='All';}
this._filter();this.view.render('setFilter',currentPage);};window.app=window.app||{};window.app.Controller=Controller;})(window);
