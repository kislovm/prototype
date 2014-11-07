modules.define(

    'b-phrase',
    ['i-bem__dom', 'b-model'],
    function(provide, BEMDOM, model) {

provide(BEMDOM.decl({ block: this.name, baseBlock: model }, {

    }));

});
