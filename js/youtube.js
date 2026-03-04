// youtube.min
(function ($) {
    $(function() {
        var vkvu_upload = vk_video_unit_options.upload
          , vkvu_mobile_choice_image = vk_video_unit_options.mobile_choice_image
          , vkvu_end_process = vk_video_unit_options.move_end_process
          , vkvu_move_height = vk_video_unit_options.move_height;
        if (!vkvu_move_height) {
            video_wrap_height();
            $(document).ready(function() {
                video_wrap_height();
            });
            $(window).on('resize', function() {
                video_wrap_height();
            });
            function video_wrap_height() {
                var menuHeight = $('#vkvu').offset().top
                  , screenHeight = $(window).height()
                  , elementHeight = screenHeight - menuHeight;
                $("#vkvu_wrap").css("height", elementHeight);
            }
        } else {
            $("#vkvu_wrap").addClass('move_height_on');
        }
        if (vkvu_upload == 'youtube') {
            var $player = $('#vkvu_video_ytb_player')
              , $mute_switch = $('#vkvu_mute_switch');
            if (('ontouchstart'in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                var touch_device = true;
            }
            $player.mb_YTPlayer();
            if ($player.hasClass('def_mute')) {
                $mute_switch.addClass('on');
            }
            if (vkvu_mobile_choice_image && !touch_device) {
                $(window).on('resize', function() {
                    ytb_mobile_mute();
                });
            }
            $mute_switch.on('click', function() {
                ytb_vol_mute();
            });
            function ytb_vol_mute() {
                if ($player.hasClass('isMuted')) {
                    $mute_switch.removeClass('on');
                    $player.YTPUnmute();
                } else if (!($player.hasClass('isMuted'))) {
                    $player.YTPMute();
                    $mute_switch.addClass('on');
                }
            }
            function ytb_mobile_mute() {
                var currentWidth = window.innerWidth || document.documentElement.clientWidth;
                if (768 > currentWidth) {
                    $player.YTPMute();
                    $mute_switch.addClass('on');
                }
            }
        }
    });
}
)(jQuery);
// common.min
(function($) {
    $(function() {
        $(window).on('load', function() {
            $('.vkvu_color_layer, .vkvu_shadow_layer').show();
        });
        if (('ontouchstart'in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            $("#vkvu_wrap").addClass('touch_device');
        }
    });
}
)(jQuery);
