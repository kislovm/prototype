modules.define(

    'b-model',
    ['i-bem__dom'],
    function(provide, BEMDOM) {

provide(BEMDOM.decl(this.name, {

    onSetMod: {
        js: {
            inited: function() {
                var domElem = this.domElem,
                    _this = this;

                this.modelName = domElem.data('model-name');
                this.modelId = domElem.data('model-id');

                this.model = this.findBlockOutside('i-model').get(this.modelName, this.modelId );

                if(!this.model) return;

                this.elem('field').each(function(i, el) {
                    el = $(el);

                    _this.model.on('change:' + el.data('field'), function() {
                        el.text(_this.model.get(el.data('field')));
                    });

                });

            }
        }
    }


    }));

});
