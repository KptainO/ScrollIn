(function($)
{
	scrollIn = function(element, options)
	{
		var _options = {};
		var _$element = null;
		var _currentAbsPosition = null;
		var _this = this;
		
		this.init = function(element, options)
		{
			/**
			 * Default option values
			 */
			this._options = $.extend({
				container: 'body',
				class:	'scrolling'
			}, options);
			
			this._$element = element;
			
			// lambda function so that method context is still "this" and not window
			$(window).on('scroll', function(event) { _this.scroll(event); });
		}
		
		this.scroll = function(event)
		{
			var $container = this._options.container;
			var absPosition = $(window).scrollTop();
			var relPosition = absPosition - $container.offset().top;
			
			// we're scrolling on $container
			if (relPosition > 0 && (relPosition <= $container.innerHeight()))
			{				
					this._$element.css({
						position: 'absolute',
						top: (relPosition + this._$element.height()) <= $container.innerHeight()
						? absPosition
						: ($container.offset().top + $container.innerHeight() - this._$element.height())
					});
			}
			// we're outside it (before OR after)
			else
			{
				// scrolling up
				if (absPosition < this._currentAbsPosition)
					this._$element.css('top', $container.offset().top + parseInt($container.css('border-top-width')));
			}

			 this._currentAbsPosition = absPosition;
		}
		
		_this.init(element, options);
	}
	
	$.fn.scrollIn = function(options)
	{	
		return this.each(function()
		{
			$(this).data('scrollIn', new scrollIn($(this), options));
			//methods.init.apply(this, options);
		});
	};
})(jQuery);