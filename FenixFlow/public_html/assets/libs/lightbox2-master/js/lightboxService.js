/*!
 * Lightbox v2.8.1
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright 2007, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.lightbox = factory(root.jQuery);
    }
}
(this, function ($) {

    App.factory("lightboxService", LightboxService);
    function LightboxService() {

        var options = {
            albumLabel: 'Image %1 of %2',
            alwaysShowNavOnTouchDevices: false,
            fadeDuration: 500,
            fitImagesInViewport: true,
            maxWidth: 1000,
            maxHeight: 600,
            positionFromTop: 100,
            resizeDuration: 700,
            showImageNumberLabel: true,
            wrapAround: true
        };

        function Lightbox(options) {
            this.album = [];
            this.currentImageIndex = void 0;
            init();
        }


        function imageCountLabel(currentImageNum, totalImages) {
            return options.albumLabel.replace(/%1/g, currentImageNum).replace(/%2/g, totalImages);
        }
        ;

        function init() {
            enable();
            build();
        }
       

        // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
        // that contain 'lightbox'. When these are clicked, start lightbox.
        function enable() {
            $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function (event) {
                start($(event.currentTarget));
                return false;
            });
        }

        // Build html for the lightbox and the overlay.
        // Attach event handlers to the new DOM elements. click click click
        function build() {
            var self = this;
            $('<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo($('body'));

            // Cache jQuery objects
            this.$lightbox = $('#lightbox');
            this.$overlay = $('#lightboxOverlay');
            this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
            this.$container = this.$lightbox.find('.lb-container');

            // Store css values for future lookup
            this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
            this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
            this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
            this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);

            // Attach event handlers to the newly minted DOM elements
            this.$overlay.hide().on('click', function () {
                end();
                return false;
            });

            this.$lightbox.hide().on('click', function (event) {
                if ($(event.target).attr('id') === 'lightbox') {
                    end();
                }
                return false;
            });

            this.$outerContainer.on('click', function (event) {
                if ($(event.target).attr('id') === 'lightbox') {
                    end();
                }
                return false;
            });

            this.$lightbox.find('.lb-prev').on('click', function () {
                if (self.currentImageIndex === 0) {
                    changeImage(self.album.length - 1);
                } else {
                    changeImage(self.currentImageIndex - 1);
                }
                return false;
            });

            this.$lightbox.find('.lb-next').on('click', function () {
                if (self.currentImageIndex === self.album.length - 1) {
                    changeImage(0);
                } else {
                    changeImage(self.currentImageIndex + 1);
                }
                return false;
            });

            this.$lightbox.find('.lb-loader, .lb-close').on('click', function () {
                end();
                return false;
            });
        }
        ;

        // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
        function start($link) {
            var self = this;
            var $window = $(window);

            $window.on('resize', $.proxy(sizeOverlay, this));

            $('select, object, embed').css({
                visibility: 'hidden'
            });

            sizeOverlay();

            this.album = [];
            var imageNumber = 0;

            function addToAlbum($link) {
                self.album.push({
                    link: $link.attr('href'),
                    title: $link.attr('data-title') || $link.attr('title')
                });
            }
            // Support both data-lightbox attribute and rel attribute implementations
            var dataLightboxValue = $link.attr('data-lightbox');
            var $links;

            if (dataLightboxValue) {
                $links = $($link.prop('tagName') + '[data-lightbox="' + dataLightboxValue + '"]');
                for (var i = 0; i < $links.length; i = ++i) {
                    addToAlbum($($links[i]));
                    if ($links[i] === $link[0]) {
                        imageNumber = i;
                    }
                }
            } else {
                if ($link.attr('rel') === 'lightbox') {
                    // If image is not part of a set
                    addToAlbum($link);
                } else {
                    // If image is part of a set
                    $links = $($link.prop('tagName') + '[rel="' + $link.attr('rel') + '"]');
                    for (var j = 0; j < $links.length; j = ++j) {
                        addToAlbum($($links[j]));
                        if ($links[j] === $link[0]) {
                            imageNumber = j;
                        }
                    }
                }
            }

            // Position Lightbox
            var top = $window.scrollTop() + options.positionFromTop;
            var left = $window.scrollLeft();
            this.$lightbox.css({
                top: top + 'px',
                left: left + 'px'
            }).fadeIn(options.fadeDuration);

            changeImage(imageNumber);
        }
        ;

        // Hide most UI elements in preparation for the animated resizing of the lightbox.
        function changeImage(imageNumber) {
            var self = this;

            disableKeyboardNav();
            var $image = this.$lightbox.find('.lb-image');

            this.$overlay.fadeIn(options.fadeDuration);

            $('.lb-loader').fadeIn('slow');
            this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

            this.$outerContainer.addClass('animating');

            // When image to show is preloaded, we send the width and height to sizeContainer()
            var preloader = new Image();
            preloader.onload = function () {
                var $preloader;
                var imageHeight;
                var imageWidth;
                var maxImageHeight;
                var maxImageWidth;
                var windowHeight;
                var windowWidth;

                $image.attr('src', self.album[imageNumber].link);

                $preloader = $(preloader);

                $image.width(preloader.width);
                $image.height(preloader.height);

                if (options.fitImagesInViewport) {
                    // Fit image inside the viewport.
                    // Take into account the border around the image and an additional 10px gutter on each side.

                    windowWidth = $(window).width();
                    windowHeight = $(window).height();
                    maxImageWidth = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20;
                    maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - 120;

                    // Check if image size is larger then maxWidth|maxHeight in settings
                    if (options.maxWidth && options.maxWidth < maxImageWidth) {
                        maxImageWidth = options.maxWidth;
                    }
                    if (options.maxHeight && options.maxHeight < maxImageWidth) {
                        maxImageHeight = options.maxHeight;
                    }

                    // Is there a fitting issue?
                    if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
                        if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
                            imageWidth = maxImageWidth;
                            imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        } else {
                            imageHeight = maxImageHeight;
                            imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        }
                    }
                }
                sizeContainer($image.width(), $image.height());
            };

            preloader.src = this.album[imageNumber].link;
            this.currentImageIndex = imageNumber;
        }
        ;

        // Stretch overlay to fit the viewport
        function sizeOverlay() {
            this.$overlay
                    .width($(window).width())
                    .height($(document).height());
        }
        ;

        // Animate the size of the lightbox to fit the image we are showing
        function sizeContainer(imageWidth, imageHeight) {
            var self = this;

            var oldWidth = this.$outerContainer.outerWidth();
            var oldHeight = this.$outerContainer.outerHeight();
            var newWidth = imageWidth + this.containerLeftPadding + this.containerRightPadding;
            var newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;

            function postResize() {
                self.$lightbox.find('.lb-dataContainer').width(newWidth);
                self.$lightbox.find('.lb-prevLink').height(newHeight);
                self.$lightbox.find('.lb-nextLink').height(newHeight);
                showImage();
            }

            if (oldWidth !== newWidth || oldHeight !== newHeight) {
                this.$outerContainer.animate({
                    width: newWidth,
                    height: newHeight
                }, options.resizeDuration, 'swing', function () {
                    postResize();
                });
            } else {
                postResize();
            }
        }
        ;

        // Display the image and its details and begin preload neighboring images.
        function showImage() {
            this.$lightbox.find('.lb-loader').stop(true).hide();
            this.$lightbox.find('.lb-image').fadeIn('slow');

            updateNav();
            updateDetails();
            preloadNeighboringImages();
            enableKeyboardNav();
        }
        ;

        // Display previous and next navigation if appropriate.
        function updateNav() {
            // Check to see if the browser supports touch events. If so, we take the conservative approach
            // and assume that mouse hover events are not supported and always show prev/next navigation
            // arrows in image sets.
            var alwaysShowNav = false;
            try {
                document.createEvent('TouchEvent');
                alwaysShowNav = (options.alwaysShowNavOnTouchDevices) ? true : false;
            } catch (e) {
            }

            this.$lightbox.find('.lb-nav').show();

            if (this.album.length > 1) {
                if (options.wrapAround) {
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                    }
                    this.$lightbox.find('.lb-prev, .lb-next').show();
                } else {
                    if (this.currentImageIndex > 0) {
                        this.$lightbox.find('.lb-prev').show();
                        if (alwaysShowNav) {
                            this.$lightbox.find('.lb-prev').css('opacity', '1');
                        }
                    }
                    if (this.currentImageIndex < this.album.length - 1) {
                        this.$lightbox.find('.lb-next').show();
                        if (alwaysShowNav) {
                            this.$lightbox.find('.lb-next').css('opacity', '1');
                        }
                    }
                }
            }
        }
        ;

        // Display caption, image number, and closing button.
        function updateDetails() {
            var self = this;

            // Enable anchor clicks in the injected caption html.
            // Thanks Nate Wright for the fix. @https://github.com/NateWr
            if (typeof this.album[this.currentImageIndex].title !== 'undefined' &&
                    this.album[this.currentImageIndex].title !== '') {
                this.$lightbox.find('.lb-caption')
                        .html(this.album[this.currentImageIndex].title)
                        .fadeIn('fast')
                        .find('a').on('click', function (event) {
                    if ($(this).attr('target') !== undefined) {
                        window.open($(this).attr('href'), $(this).attr('target'));
                    } else {
                        location.href = $(this).attr('href');
                    }
                });
            }

            if (this.album.length > 1 && options.showImageNumberLabel) {
                var labelText = imageCountLabel(this.currentImageIndex + 1, this.album.length);
                this.$lightbox.find('.lb-number').text(labelText).fadeIn('fast');
            } else {
                this.$lightbox.find('.lb-number').hide();
            }

            this.$outerContainer.removeClass('animating');

            this.$lightbox.find('.lb-dataContainer').fadeIn(options.resizeDuration, function () {
                return sizeOverlay();
            });
        }
        ;

        // Preload previous and next images in set.
        function preloadNeighboringImages() {
            if (this.album.length > this.currentImageIndex + 1) {
                var preloadNext = new Image();
                preloadNext.src = this.album[this.currentImageIndex + 1].link;
            }
            if (this.currentImageIndex > 0) {
                var preloadPrev = new Image();
                preloadPrev.src = this.album[this.currentImageIndex - 1].link;
            }
        }
        ;

        function enableKeyboardNav() {
            $(document).on('keyup.keyboard', $.proxy(keyboardAction, this));
        }
        ;

        function disableKeyboardNav() {
            $(document).off('.keyboard');
        }
        ;

        function keyboardAction(event) {
            var KEYCODE_ESC = 27;
            var KEYCODE_LEFTARROW = 37;
            var KEYCODE_RIGHTARROW = 39;

            var keycode = event.keyCode;
            var key = String.fromCharCode(keycode).toLowerCase();
            if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
                end();
            } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
                if (this.currentImageIndex !== 0) {
                    changeImage(this.currentImageIndex - 1);
                } else if (options.wrapAround && this.album.length > 1) {
                    changeImage(this.album.length - 1);
                }
            } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
                if (this.currentImageIndex !== this.album.length - 1) {
                    changeImage(this.currentImageIndex + 1);
                } else if (options.wrapAround && this.album.length > 1) {
                    changeImage(0);
                }
            }
        }
        ;

        // Closing time. :-(
        function end() {
            disableKeyboardNav();
            $(window).off('resize', this.sizeOverlay);
            this.$lightbox.fadeOut(options.fadeDuration);
            this.$overlay.fadeOut(options.fadeDuration);
            $('select, object, embed').css({
                visibility: 'visible'
            });
        }
        ;

        return {
            getLightbox: Lightbox()
        };
    }
}));
