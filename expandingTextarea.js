(function($, undefined){
	$.widget('ui.expandingTextarea', {
		options: {
			minRows: 2
		},

		_create: function(){
			var self = this,
				textarea = $('<textarea>');

			self.element.append(textarea);
			textarea.prop('rows', self.options.minRows)
				.css({
					overflow: 'hidden',
					'min-height': textarea.height()
				})
				.on('keyup', self, self._resize);
			self.textarea = textarea;
		},

		_resize: function(e){
			var self = e.data,
				textarea = self.textarea[0],
				textareaStyle = textarea.style,
				scrollHeight = textarea.scrollHeight;

			if(scrollHeight){
				var newHeight = scrollHeight,
					newPx = newHeight + 'px';

				//set new height
				if(newPx != textareaStyle.height){
					textareaStyle.height = newPx;
				}
				
				//shrink
				var origScrollHeight = scrollHeight,
					newScrollHeight = origScrollHeight,
					origMinHeight = textareaStyle.minHeight,
					decrement = 4,
					thisScrollHeight,
					origScrollTop = textarea.scrollTop,
					change;

				textareaStyle.minHeight = newPx;
				textareaStyle.height = 'auto';
				while(newHeight > 0){
					textareaStyle.minHeight = Math.max(newHeight - decrement, 4) + 'px';
					thisScrollHeight = textarea.scrollHeight;
					change = newScrollHeight - thisScrollHeight;
					newHeight -= change;
					if(change < decrement){
						break; // scrollHeight didn't shrink
					}
					newScrollHeight = thisScrollHeight;
				}
				textareaStyle.height = newHeight + 'px';
				textareaStyle.minHeight = origMinHeight;
				textarea.scrollTop = origScrollTop;
			}
		}
	});
}(jQuery));
