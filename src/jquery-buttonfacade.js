/* jQuery UI facade button.
hides a button with a facade.  when clicked you control the behavior and decide when to pass the click onto original button's click.
*/
(function ($) {
	$.widget("ui.buttonfacade", {
		options: {
			button: {},
			click: null
		},
		_create: function () {
			this.facade = $("<a></a>")
				.html($(this.element).val())
				.addClass("buttonfacade")
				.button(this.options.button)
				.data("original", this.element)
				.click(function (arg) {
					var opt = $(this).data("original").buttonfacade("option", "click");
					if ($.isFunction(opt)) {
						opt(arg);
					} else {
						$(this).data("original").click();
					}
				});
			$(this.element).hide().after(this.facade);
		},
		destroy: function () {
			this.element.show();
			this.facade.remove();
		}
	});
})(jQuery);