module('Backbone.Mutators', {
	setup: function () {
		_.extend(Backbone.Model.prototype, Backbone.Mutators.prototype);
	}
});

test("can get 'normal' value", function () {
	expect(2);
	var Model = Backbone.Model.extend({
		mutators: {
			fullname: function (attributes) {
				return this.firstname + ' ' + this.lastname;
			}
		}
	});

	var model = new Model();
	model.set('firstname', 'Sebastian');
	model.set('lastname', 'Golasch');

  	equal(model.get('firstname'), 'Sebastian', 'Can get unmutated firstname');
  	equal(model.get('lastname'), 'Golasch', 'Can get unmutated lastname');
});

test("can get 'mutated' value (newly created)", function () {
	expect(3);
	var Model = Backbone.Model.extend({
		mutators: {
			fullname: function (attributes) {
				return this.firstname + ' ' + this.lastname;
			}
		}
	});

	var model = new Model();
	model.set('firstname', 'Sebastian');
	model.set('lastname', 'Golasch');

  	equal(model.get('firstname'), 'Sebastian', 'Can get unmutated firstname');
  	equal(model.get('lastname'), 'Golasch', 'Can get unmutated lastname');
  	equal(model.get('fullname'), 'Sebastian Golasch', 'Can get mutated fullname');  	
});

test("can get 'mutated' value (overridden)", function () {
	expect(5);
	var Model = Backbone.Model.extend({
		mutators: {
			status: function (attributes) {
				return { status: this.status, overallStatus: this.overallStatus, underestimatedNonOverallStatus: this.underestimatedNonOverallStatus };
			}
		}
	});

	var model = new Model();
	model.set('overallStatus', 1);
	model.set('underestimatedNonOverallStatus', 3);
	model.set('status', 2);

  	equal(model.get('overallStatus'), 1, 'Can get unmutated overallStatus'); 	
  	equal(model.get('underestimatedNonOverallStatus'), 3, 'Can get unmutated underestimatedNonOverallStatus'); 	
  	equal(model.get('status').status, 2, 'Can get mutated status');
  	equal(model.get('status').overallStatus, 1, 'Can get mutated status'); 
  	equal(model.get('status').underestimatedNonOverallStatus, 3, 'Can get mutated status');   	  		
});

test("can get 'normal' value - object context", function () {
	expect(2);
	var Model = Backbone.Model.extend({
		mutators: {
			fullanme: {
				get: function (attributes) {
					return this.firstname + ' ' + this.lastname;
				}
			}
		}
	});

	var model = new Model();
	model.set('firstname', 'Sebastian');
	model.set('lastname', 'Golasch');

  	equal(model.get('firstname'), 'Sebastian', 'Can get unmutated firstname');
  	equal(model.get('lastname'), 'Golasch', 'Can get unmutated lastname');
});

test("can get 'mutated' value (newly created) - object context", function () {
	expect(3);
	var Model = Backbone.Model.extend({
		mutators: {
			fullname: {
				get: function (attributes) {
					return this.firstname + ' ' + this.lastname;
				}
			}
		}
	});

	var model = new Model();
	model.set('firstname', 'Sebastian');
	model.set('lastname', 'Golasch');

  	equal(model.get('firstname'), 'Sebastian', 'Can get unmutated firstname');
  	equal(model.get('lastname'), 'Golasch', 'Can get unmutated lastname');
  	equal(model.get('fullname'), 'Sebastian Golasch', 'Can get mutated fullname');  	
});

test("can get 'mutated' value (overridden) - object context", function () {
	expect(5);
	var Model = Backbone.Model.extend({
		mutators: {
			status: {
				get: function (attributes) {
					return { status: this.status, overallStatus: this.overallStatus, underestimatedNonOverallStatus: this.underestimatedNonOverallStatus };
				}
			}
		}
	});

	var model = new Model();
	model.set('overallStatus', 1);
	model.set('underestimatedNonOverallStatus', 3);
	model.set('status', 2);

  	equal(model.get('overallStatus'), 1, 'Can get unmutated overallStatus'); 	
  	equal(model.get('underestimatedNonOverallStatus'), 3, 'Can get unmutated underestimatedNonOverallStatus'); 	
  	equal(model.get('status').status, 2, 'Can get mutated status');
  	equal(model.get('status').overallStatus, 1, 'Can get mutated status'); 
  	equal(model.get('status').underestimatedNonOverallStatus, 3, 'Can get mutated status');   	  		
});

test("can set 'normal' value (key <-> value)", function () {
	expect(1);
	var Model = Backbone.Model.extend({
		mutators: {
			status: {
				set: function (attributes) {
					return { status: this.status, overallStatus: this.overallStatus, underestimatedNonOverallStatus: this.underestimatedNonOverallStatus };
				}
			}
		}
	});

	var model = new Model();
	model.set('overallStatus', 1);

  	equal(model.get('overallStatus'), 1, 'Can get unmutated overallStatus');
});

test("can set 'mutated' value (key <-> value)", function () {
	expect(2);
	var Model = Backbone.Model.extend({
		mutators: {
			status: {
				set: function (key, value, options) {
					this.set('pState', value.pState, options);
					this.set('aState', value.aState, options);
				}
			}
		}
	});

	var model = new Model();
	model.set('status', {pState: 1, aState: 2});

  	equal(model.get('pState'), 1, 'Can get mutated pState');
  	equal(model.get('aState'), 2, 'Can get mutated aState');  	
});

test("can set 'normal' value (object)", function () {
	expect(1);
	var Model = Backbone.Model.extend({
		mutators: {
			status: {
				set: function (attributes) {
					return { status: this.status, overallStatus: this.overallStatus, underestimatedNonOverallStatus: this.underestimatedNonOverallStatus };
				}
			}
		}
	});

	var model = new Model();
	model.set({overallStatus: 1});

  	equal(model.get('overallStatus'), 1, 'Can get unmutated overallStatus');
});

test("can set 'mutated' value (object)", function () {
	expect(2);
	var Model = Backbone.Model.extend({
		mutators: {
			status: {
				set: function (key, value, options) {
					this.set('pState', value.pState, options);
					this.set('aState', value.aState, options);
				}
			}
		}
	});

	var model = new Model();
	model.set({status: {pState: 1, aState: 2, dState: 3}});

  	equal(model.get('pState'), 1, 'Can get mutated pState');
  	equal(model.get('aState'), 2, 'Can get mutated aState');  
});

test("can serialize an unmutated model", function () {
	expect(2);
	var Model = Backbone.Model.extend({
		defaults: {
			a: 'a',
			b: 'b'
		} 
	});

	equal((new Model()).toJSON().a, 'a', 'can serialize unmutated model');
	equal((new Model()).toJSON().b, 'b', 'can serialize unmutated model');	
});

test("can serialize an unmutated model", function () {
	expect(3);
	var Model = Backbone.Model.extend({
		defaults: {
			a: 'a',
			b: 'b'
		},
		mutators: {
			state: function () {
				return this.a + ', ' + this.b;
			}
		}
	});

	equal((new Model()).toJSON().a, 'a', 'can serialize mutated model');
	equal((new Model()).toJSON().b, 'b', 'can serialize mutated model');	
	equal((new Model()).toJSON().state, 'a, b', 'can serialize mutated model');		
});