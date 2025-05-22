enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
browserEvents.BackSlash.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Old Style Mode", 1000, false)
    color.startFadeFromCurrent(color.Arcade)
})
browserEvents.Y.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Y for Yourself aka DIY Mode?", 1000, false)
    color.startFadeFromCurrent(color.DIY)
})
browserEvents.Equals.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Equals what?", 1000, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeLifeBy(-3)
        music.magicWand.play()
    } else {
        info.changeLifeBy(-3)
        sprite.say("Get Good", invincibilityPeriod)
        music.knock.play()
    }
    pause(invincibilityPeriod)
})
browserEvents.CapsLock.onEvent(browserEvents.KeyEvent.Pressed, function () {
    mySprite.sayText("BRO WHY ARE YOU DOING CAPSLOCK? ARE YOU STUPID?", 1000, false)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile19`, function (sprite, location) {
    music.stopAllSounds()
    color.startFadeFromCurrent(color.Adafruit)
    game.setDialogCursor(img`
        fffffffcbccffffffffffcfbddddddddddd111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbffcddffffffcfcfffff
        fffffffccffffcffffffbfddddddddd11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfccdbffffffffffffff
        fffffffcffffffbffffffddddddddd1111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffcbfffffffffffcdcf
        ffffffcffffffffbdffffddddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffdfbfffffff
        fcfffffffcdcdffdffdccdddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbffffffdffffffff
        fffffffffdbddcfffffcddddd1111111111111111111111111111111111111111111dddd1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfcfffffcfffbfff
        fcffffbffbffffffffbbddddd111111111111111111111111111111111111111111d11dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdcfffffffffbffff
        fcbffffffcfffffffcdddd1111111111111111111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffffffffff
        fdcccffffdbffcffccdddd111111111111111111cc1111111111111111111111111d111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffff
        fffffffffffffffcdddd1111111111111111111cccc111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfcfffffffffffff
        ffffffffffffffcbddd11111111111111111111cccc11111111111111111111111111111dddd1ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffffff
        fffffffddcfffdddddd11111111111111111111ccccc11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff
        fffffffdddbffbddd111111111111111111111cccccc111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffcffffffffff
        ffffffcbfcccddddd111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfffffffffffff
        fffffffffcfddddd1111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffff
        ffffffffdfcdddd1111111d11111d111111111cccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfbfffcfffffff
        ffffffffcfbddd11111111111111111111111ccccccccc1111111111111111111111111111111111d1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfffdffffffff
        fffffffcdcdddd11111111111111111111111cccccccccc1111111ccc111111111ccc111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffff
        fffffbfffcddd11111111111111111111111ccccccccccc1111111cccc111c1111ccc11111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        fccffdcbfbddd11111111111111111111111cccccccccccc111111cccc11ccc111ccc1111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        fffcffcdfbdd11111111111111111111111ccccccccccccccc1111cc1c11ccc11cccc111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
        ffddfffbbbdd1111111111111111111111cccccccccccccccc1111cc1c11ccc11c11c111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfccfffffffff
        cfdffffbcdd11111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfcdfffffffff
        ffffffccdd111111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfbfffffffff
        ffcfffbdb111111111111111111111111111cccccccccccc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbdddddddddddddddcfdbffffffff
        fffffcddddd1111111111111111111111111cc1cc1ccd1cc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbfcfffffffff
        fffffbdddd11111111111111111111111111cc1cc1ccc1cc1111111ccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddcfcfffffffff
        ffffcbddddd1111111111111111111111111cccccccccccc11111111ccccccccccc11111111111111111d1ddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbcfffffffffff
        fffccddddd11111111111111111111111111cccccccccccc111111111cccccccccc11111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbdddddddddddddddbbffffffffffff
        ffdcbddddd11111111111111111111111111cccccccccccc111111111ccccccccc111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbffffffffffcf
        ffccddddddd11111111111111111111111111cccccccccc1111111111ccccccccc1111111111111111111dddddddddddddddddddddddddddddddddddddddddddddbddddddbbdddddddbcffffffffffff
        ffcbdddddd1111111111111111111111111111cccccccc11b11111111ccccccccc111111111111bb1111ddddddddddddddddddddddddddddddddddddddddddbbddbbdddddbbdddddddbccfffffffffff
        ffcbddddd111111111111111111111111111111cccccccbccccccc111ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbddbddddddbddddddddfffffffffffff
        fcbbdddddd1111111111cccb1ccc1111cccc111ccccccccccccccccc1ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbbdbbdddddbdbddddbbbcfffffffffff
        fcddddddd1111111111ccccb1cccc11ccccc111cccccccccbbccbbbccccccccccc1111111111111b111ddddddddddddddddddddddddddbdddddddddddddddddddbddbbddddbbbddbbbcfffffffffffff
        ccddddddd1111111111cccccbcccc11ccccc111cccccccccbbcccbbccccccccccc111111111111111111dddddddddddddddddddddddddbbdddddddddddddddddddbddbddddbbddbbbbffffffffffffff
        ddddddddd1111111111ccc1ccccccccc1ccc111ccccccccccccccccccccccccccc1111111111111b111bdddddddddddddddddddddddddbbdddddddddddddddddddbbbbddddbddbbbbccfffffffffffff
        dddddddd11111111111cc11ccc11cccc1ccc111ccccccccc1111cccccccccccccc1111111111111b111bddd1dddddddddddddddddddddbdddbdddddddddddddddddbbbddddbbbbbbbccfffffffffffff
        dddddddd11111111111cccccccbcccccccccc11cccccccc1111111cccccccccccc1111111111111b111bddd1dddddddddddddddddddddbddbbdddddddddddddddddbbbdddbbbbbbbbccfffffffffffff
        dddddddd11111111111ccccccccccccccccc111ccccccc1111b1111ccccccccccc1111111111111b1dbb1ddddddddddddddbbbbddddddbddbdddddddddddddddddddbbdddbbbbbbbccffffffffffffff
        dddddddddd111111111cccccccccccccccc1bb1ccccccc1111bb111ccccccccccc11111b1111111b1dbbdddddddddddddddbddbbbddddbdbddddddddddddddddddddbbddbbbbbbbbcbffffffffffffff
        dddddddddd1111111111cccccccccccccccccccccccccc111111111cccccccccccbb11111111111b1db1dddddddddddddddbdddbbddddbbdddddddddddddddddddddbbdbbbbbbbbccfffffffffffffff
        dddddddddd11111111111cccccccccccccbccbbccccccc1111111b1cccccccccccbbbb111111111b1db1ddd1ddddddddddbbdddbbbddbbdddddddddddbbddddddddbbbbbbbbbbbcbbcffffffffffffff
        ddddddddd1d11111111111ccccccccccccbbcbbccccccc1111111b1cccccccccccc1b1111111111bbbddddd1dddddddddbbdddddbbdbbddddddddddddbdddddddddbbbbbbbbbbccbcfffffffffffffff
        ddddddddd1d11b11111111ccccccccccccbccbcccccccc111111bb1cccccccccccc111111111111bbbdddddddddddddddbbdddddbbbbbddddddddddddbdddddddddbbbbbbbbbbbbcffffffffffffffff
        ddddddddd1d11b11111111cccccccccccccccccccccccc1111111bbcccccccccccc11111111111bbbdddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbccfffffffffffffffff
        dddddddddddddbbd1bb111cccccccccccc111d1cccccccd1d1111bbcccccccccccc11111111111bbb1ddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbbccffffffffffffffff
        dddddddddddddbbd1b1111ccccccccccccddbccccccccccc1ddddbccccccccccccc11111111bb1bb11dddbddddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddbd1b11bbccccccccccccccccccccccccccbcccccccccccccccccb1d111111bbbbbdddddbbdddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddbb1b11bbccccccccccccccccccccccccccccccccccccccccccccd1111b1111bbb11ddddbbdddddddddddddddddbbbbddddddddddddbbdddddbbbbbbbbbbbbbbcffffffffffffffffff
        dddddddddddddddb1b1db1ccccccccccccccccccccccccccccccccccccccccccccc1111d1111bbb11dddddbbddddddddddddddddbbbbbddddddddddddbdddddbbbbbbbbbbbbbbbcfffffffffffffffff
        ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1111d1111bbbddddddddbddddddddddddddddbbbbbddddddddddddbbdddbbbbbbbbbbbbbbbcffffffffffffffffff
        ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1b11d1111bbbddddddddbbdbbddddddddddddbbbbbddddddddddddbbddbbbbbbbbbbbbbbbcfcffffffffffffffcff
        ddddddddddddddddbb1b11cccccccccccccccccccccccccccccccccccccccccccccbbb111111bbbddddddddbbdbdddddddbbddddbbbbbdddddddddddbbbbbbbbbbbbbbbbbbbccfffffffffffffffffff
        ddddddddddddddddbddbd1ccccccccccccccccccccccccccccccccccccccccccccbbb111d111bbbb1dddddddbbbdddddddbbddddbbbbbddddddddbdbbbbbbbbbbbbbbbbbbbbcfcffffffffffffffffff
        ddddddddddddddddbbb111cccccccccccccccccccccccccccccccccccccccccccc1bb1111111bbbbddddddddbbbdddddddbdddddbbbbbddddbdddbdbbbbbbbbbbbbbbbbbbbbffffffffffffffffffcff
        ddddddddddddddddbbd111ccccccccccccccccccccccccccccccccccccccccccccd1bbb11111bbbbdddddddddbbddddddbbdddddbbbbbdddbbdddbbbbbbbbdbbbbbbbbbbbbcfffffffffffffffffffff
        ddddddddddddddddbbdd1dcccccccccccccccccccccccccccccccccccccccccccc111bb11111bbbbdddd1ddddbbddddddbbdddddbbbbbdddbbddddddbdddddddddbbbbbbbbcfffffffcfffffffffffff
        dddddddbbdddddbbbbddddcccccccccccccccccccccccccccccccccccccccccccc111bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbddddbdbdddddddddddddddddddddddfffffffffffffffffffff
        dbddddddddbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccbcccccb11bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbbdddddddddddddddbddddddddddbbcfffffffffffffffffffff
        ddbddbddbbbbbbbbbbbbbbcccccccccccccccccccccccccccccbccccccccccccccd11b11111bbbbbbddddddddbbbdddddbbddddbbbbbbdddddddddddddddddddddddddddbcffffffffffffffffffffff
        dbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccc111bb111bbbbbbbbdddddddbbbbddddbbdddbbbbbbddddddddddddddddddddddddddbbbcdfffffffffffffffffffff
        bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbb1bb1bbbbbbbbbbbbdddddbbbbddddbbddbbbbddbbdddddddddddddddddddbddddbccfddfffffffffffffffffffff
        dbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddbdddddddddddddbcffffffffffffffffffffffffff
        bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbdbddddbdddddddddddddddddddddddddddccffffffffffffffffffffffffff
        bbbbbbbbddbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbddddddddddddddddddddddbdddddbbbffbdfffffffffffffffffffffff
        bbbbbbbdddddbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbddddbddddddddbdddddddddddddddddddddddddddbddfcbfdffffffffffffffffffffff
        bbbbddddddddddddddbbbbcccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddbdffdffbcfffffffffffffffffffff
        bbbddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccbbbdbbdbdddddddbddddbddddddddddddddddddddddddddddddddddddddcffcdfffffffffffffffffcfffffff
        bbdddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbcccbbbbbddbdddddddddddddddddddddddddddddddddddddddddddddddddbcdffdfcdfffffffffffffffffffffff
        bddddddddddddddbdbbbbccccccccccccccccccccccccccccccccccccccccccbcbbbcbddddddddddddbddddddddddddddddddddddddddddddddddbddddddddddbfcffffcffffffffffffffffffffffff
        ddddddddddddddddbdbbbcccccccccccccccccccccccccccccccccccccccccbbcddddcdbddddbbddddbbdddddddddddbdddddddddddddddddddbddddddddddddcbdffffffffffbfffffcffffffffcbff
        dbdbddddddddbdbdbbbbccccccccccccccccccccccccccccccccccbcccbcbbdbcddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddddcffffffffffffffffffffffffcfffddf
        ddddddbddddddddbbbbbcccccccccccccccccccccccccccccccbbcbccbbbbdbdddddddddddbbbddddddddddddddddddddddddddddddddddddddddddddddddddbffffffffffffffffffffffffcdfffcff
        ddddddddddddbdbbbbbbccccccccccccccccccccccccccccccbbbbbbdddddddbddddddddddddbddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffdffff
        dddddddddddddbbbbbbcccccccccccccccccccccccccccccbbbcddddbdbcdddcddddddddddddddddbdddbddddddddddbdddddddddddddddddddddddddddddddccfffffffffffffffffffffffffffffff
        ddddddddddddbbbbbbbcccccccccccccccccccccccccccbbddddddddbdbddddbdddddddddddddddddddddddddbbbddddddddddddddddddddddddddddddddddcfcffffffffffffffffcffffffffffffff
        bdbddddddbddbbbbbbccccccccccccccccccccccccccbddddbbdddddddddddddddddddbddddddddddddddddddddddddddddbdbdddddddddddddddddddddddbffffffffcffffffffffffffffcfcffffff
        dbddbdddddddbbbbcccccccccccccccccccccccccccdbdbdddddddddddddddddddddddbddddddddbdcbddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffcffffff
        dddddddddddddddddbcbcccccccccccccccccccccbddcbbcdddbddddddddddddcdbddddddddddddddddddddbdddddddddddddddddddddddddddddddddddddfffbffffffffffffffffffffffffffcffff
        ddddddddddddcddddddbbccccccccccccccccbcbcbddddddbdbcddddddddddddddddddddddddddcbddddddddddddbdddddddddddddddddddddddddddddddcfffdfffffffffffffffffffffffffffffff
        dddddddddddbcdddddbddcbbcccccccbcccbbbbbccddbddddbdbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddbffffcfffffffffffffffffffffffffffffff
        bdddddddddcdddddddddbcbbbcbbbcbbbdddbddddbddddddddddddddddbddddddddddddddddbcdddcddddddddddddddddddddddddddccddddddddddddddbddfffffffffffcffffffffffffffffcccfff
        ddddddddddddbddddbdddbbdbcbddbdbddddddddddbdddddddbdddddcddddddddddddbddddddddddddddddbddddddddbdddddddddddddddddddddddddddcdfffffffffffffffffffffffffffffccfffc
        dddcdddddddddddddddddcdddddddbdbbbdddbddddddddddddccdddddbddddddddcddddddddcddddddddddddddddddddddddddddddddddddddddcddddddcffffffffffffffffffffffffffffffffffff
        dddbdddddddddddddddddcdddddddcbddddbbddddddcdbddbdddddddddddbcbbbdcbddddddcbddddddddddddddddddddddddddddbddddddddddddddddddcfffffffffffffffcffffffffffffffffffff
        bdddddddddddddddddddddddddddbddbdbcbdbbddddbdddddddddddddbbbbbbcbbbbcdbbddddbddbcddddddddddddddddbdddddddddddddddddddddddddcffffbdcffffffffcffffffffffcfffffffff
        dddddddddddddddddddddddddddbbdddddbcdddddddbddddcdbbdbbbbcccbbccccbcbcbbbbbbbbccbcbbbdbbbbddddddddddddddddddddddddddbbbbdddcffffcfbfffffffffffffffffffffffffffff
        dddddddddddddddddddbdddddcbbddddddbbdddddddbbddddbbbbbccccccccccccccccccccccccccccbccbcbbccbdbbdddddddddddddddddddbbbbbbddbccfddfffffffffffbbfffffffffffffffffff
        bbbdddddddbddddddddddddbddcddbdddddbbddbccbcccbbcbbbcbccccccccccccccccccccccccccbcccccccccccccbbbdddddddddddddbbbbccccbbddccfffffcffffffffffffffffffffffffffffff
        cccbddddddddddddddddddddddbdddddbbbcbcccccbcccccccccccccccccccccccccccccccccccccccccccccccccccbccccbdbdddbdbbbcccbccbbbdddbfffffdfffffffffffffffffffffffffffffff
        ccccddbdddddddddddcddddccbbbccbbcbbccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbdddddfffffffffffffffcfffffffffffffffffffff
        ccbbbbbddddddddddbcdddcccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccbbddddddbfffffffffffffffffffffffffffffffffffff
        ccccccbcbbbdddddbcccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbddddddddbfffffffffffffffffffffffffffffffffffff
        cccccccbccbbbcbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbdddddddddbcffffffffffffffffcbfffffffffffffffffff
        cccccccccccbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccbbdddddbdddbcfffffffffffffffffffffffffffffffffffff
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbbcccccccccccccbbbbddddddddddbcffcffffffffffffffffffffffffffffffffff
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbbcccccbbcccccccbbbbdddddddddddbccffffffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbddddddbbcbbbdbccccbbdddddbdddddddddcffdffdffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccccccbbccccccccccccccccccccccccccccccccccccccccbcccbbbbbbddddddddddddddbbbbbbdddddcdddddddddddbcfffffffffffffffffffffffffffffffffffffc
        cccccccccccccccccccccccccccccbbddcbccccbccccccccccccccccccccccccccccccbdbbbbddddbdddddbddddddddddddddddddddddccdddddddddcfffffffffffffffffffffffffffffffffffffff
        cccccccccccccccccccccccccccbbbcddbbcbbbbbccbbcccccccccccccccccccccbbbddddbbdddddbdccddbdddddddddddddddddddddddddddddddbcffffffffffffffffffffcfffffffffffffffffff
        ccccccccccccccccccccccccccbddddddbbbbddbbbbdbccccccccccccccccccbcddddddddddbddcbdccbddddddddddddddddddddddddddddddddcbfdffffffffffffffffffffffffffffffffffffffff
        cccccccccccccccbccccccccbcdddddddddbddddddbbbddbbbbccccccccccccdbdddddddddddbddddddddddddddddddddddddddddddddddddddcfcfffffffffffffffffcbffffffffffffffcffffffff
        cccccccccccccccccccccfccccbddddddddddddddbcbcdddddbbbcccccbbbcdddddddbdddddddddddddddddddddddddddddddddddddddddddcdffbffffffffffffffffffbffffffffffffcbcffffffff
        ccccccccccccccccccfccffffccbdddddddddddddddbdbddddddcdbcbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffdffcfffffbfffffffffdccfffffffffffffffffffff
        cccccccccccccccffcffcccffffccdddddddddddddcccdddddbdbddbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffddfffffffffffffffddffffffffffffffffffffff
        cccccccfccffffcffffffcdfffffcfddddddddddddbccbddddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffffffdfffffffffcffffffffffffffbffffffffffffff
        ccfcccfffffffffffffffffffffcfccddddddddddbdcdddddddddddddddddddddddddddddddddddddddddddddbccbbccbcbbbdbbbdbfffdffffffffffffffffcfffffffffffffddfffffffffffffffff
        cffcccffffffffffffffffffffffbcfcdddddddddccbdbdddddddddddddddddddddddddddddddddddddddbddfccccbfcfffffcbcfffcffcffffffffffccfffcffffffffffffffdbfffffffffffffffff
        fcfffffffffffffffffffffffffffffbcbbdddddbcbcdbbbcbdbddddddddddddddddddddddddddddddbbccffffffffffffffffcbfffffffffffdffffcfffffffffffffffffffccffffffffffffffffff
        fffffffffffffffffffffffffffffffcfffcdcfffcbcfcbccfccbddddddddddddddddddddddddddddbbbcfffffffffffffffffffcdbffffffffffffcdfdfffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffcffffffdffdfcffffccddddddddddddddddddddddddbdccfffffffffffffffffffffcffffcffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffdfffffbfbfffffbcfbffffffcccbcbcbdddddddddddddccccffffffffffffffffffffffffffffffffffffffffffcfffffffccfffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffccffffffffffffffdfdcfffffddffcffccccffbdbbbdddcfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffffffffffffffffffffffff
        fffffffffffffffffffcffffffffffffffffffffffffffffffffddfcfbfffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffcfffffdcfffddffffffffffffffffbffffcbffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffcfffff
        ffffffffffffffffffffffdfffffffffcfffffffbffffffffffdffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffbffffdfffcddcfffffffffffffffff
        fffffffffffffffffffffffffffffffffbffffffbffffffffffffffffffffffbfcffffcfffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffdddffffffffffccffffff
        `)
    music.play(music.createSong(assets.song`Ꮆ闩爪㠪 ㄖᐯ㠪尺`), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.LoopingInBackground)
    game.setGameOverMessage(false, ".............................................")
    game.gameOver(false)
    pause(5000)
    game.reset()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile38`, function (sprite, location) {
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . b b b b b b b . . . . 
        . . . b b 1 1 1 1 1 1 1 b b . . 
        . . b 1 1 1 1 1 f 1 1 1 1 1 b . 
        . . b 1 f 1 1 1 f 1 1 1 f 1 b . 
        . b 1 1 1 f 1 f f f 1 f 1 1 1 b 
        . b 1 1 1 1 f f f f f 1 1 1 1 b 
        . b 1 1 1 1 f f f f f 1 1 1 1 b 
        . b 1 1 1 1 f f f f f 1 1 1 1 b 
        . b 1 1 1 1 f f f f f 1 1 1 1 b 
        . b 1 1 1 1 f f f f f 1 1 1 1 b 
        . b 1 1 1 f 1 f f f 1 f 1 1 1 b 
        . . b 1 f 1 1 1 f 1 1 1 f 1 b . 
        . . b 1 1 1 1 1 f 1 1 1 1 1 b . 
        . . . b b 1 1 1 1 1 1 1 b b . . 
        . . . . . b b b b b b b . . . . 
        `)
    game.setDialogFrame(img`
        . . 5 5 4 5 5 5 5 5 4 5 5 . . 
        . 4 5 5 5 5 5 5 5 5 5 5 5 4 . 
        5 5 5 5 4 4 4 4 4 4 4 5 5 5 5 
        5 5 5 4 e e e e e e e 4 5 5 5 
        4 5 4 e e e e e e e e e 4 5 4 
        5 5 4 e e e e e e e e e 4 5 5 
        5 5 4 e e e e e e e e e 4 5 5 
        5 5 4 e e e e e e e e e 4 5 5 
        5 5 4 e e e e e e e e e 4 5 5 
        5 5 4 e e e e e e e e e 4 5 5 
        4 5 4 e e e e e e e e e 4 5 4 
        5 5 5 4 e e e e e e e 4 5 5 5 
        5 5 5 5 4 4 4 4 4 4 4 5 5 5 5 
        . 4 5 5 5 5 5 5 5 5 5 5 5 4 . 
        . . 5 5 4 5 5 5 5 5 4 5 5 . . 
        `)
    game.showLongText("DADA!! I'M FOLOWIN U!!!!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile38`, assets.tile`transparency16`)
    tileUtil.replaceAllTiles(assets.tile`myTile49`, assets.tile`myTile50`)
    Eevee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . e 4 e e e 4 . . . 
        . . . . . . e 4 e e e e e 4 . . 
        . . . . . . e 4 e e e e e 4 . . 
        . . . . . . e 4 1 b e b 1 4 . . 
        . . . . . . e e 1 f e f 1 . . . 
        . 5 5 5 . . e e f e b e e . . . 
        . 5 5 5 . . 5 e f f e e 5 . . . 
        . 5 5 e e 5 5 5 5 5 5 5 5 5 . . 
        . 5 e e e 5 5 e 5 5 5 e 5 5 . . 
        . . e e e 5 5 e 5 5 5 e 5 5 . . 
        . . e e e e e e e e e e . . . . 
        . . . . e e e e e b e e e . . . 
        . . . . . . e b e b e b e . . . 
        . . . . . . e b e b e b e . . . 
        . . . . . e e b e b e b e e . . 
        `, SpriteKind.Player)
    Eevee.follow(hero, 50)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile72`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.stopAllSounds()
    music.play(music.stringPlayable("C D C D C D E F ", 120), music.PlaybackMode.InBackground)
    game.gameOver(false)
})
function giveIntroduction () {
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 5 3 3 3 3 3 3 3 f f . 
        f 3 d 3 3 3 3 3 3 3 7 3 5 3 f . 
        f 3 3 3 f f f f f f f 3 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 5 f e e e e e e e f d 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 5 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 7 f . 
        f 3 7 3 f f f f f f f 5 3 3 f . 
        f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . 
        f f 3 3 3 3 5 3 3 3 3 d 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Umbre LOVES DONUTS! More than anybody! Help him Collect the Donuts and don't get the marshmallows, HE'S SCARED OF MARsHMELLOWS!!! Beat the Game to Win!")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    attemptJump()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    hero.startEffect(effects.ashes)
    game.gameOver(false)
    music.stopAllSounds()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Walking, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . 2 2 3 3 3 2 2 . . . . . 
        . . . . 2 3 3 3 3 5 2 . . . . . 
        . . . 2 3 5 3 2 3 3 3 2 . . . . 
        . . . 2 3 3 3 2 3 3 7 2 . . . . 
        . . . 2 3 3 3 2 3 3 3 2 . . . . 
        . . . 2 3 7 3 2 3 3 3 2 . . . . 
        . . . . 2 3 3 5 3 5 2 . . . . . 
        . . . . 2 2 3 3 3 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 3 3 2 2 . . . . . 
        . . . . . 2 5 3 3 3 2 . . . . . 
        . . . . 2 3 3 3 2 5 3 2 . . . . 
        . . . . 2 7 3 3 2 3 3 2 . . . . 
        . . . . 2 3 3 3 2 3 3 2 . . . . 
        . . . . 2 3 3 3 2 7 3 2 . . . . 
        . . . . . 2 5 3 5 3 2 . . . . . 
        . . . . . 2 2 3 3 2 2 . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . 2 5 2 3 2 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 2 2 . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . 
        . . . . . 2 2 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 2 5 2 3 2 . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . 2 2 5 5 2 2 . . . . . 
        . . . . . 2 5 5 5 5 2 . . . . . 
        . . . . 2 5 5 2 5 5 5 2 . . . . 
        . . . . 2 5 5 2 5 5 5 2 . . . . 
        . . . . 2 5 5 2 5 5 5 2 . . . . 
        . . . . 2 5 5 2 5 5 5 2 . . . . 
        . . . . . 2 5 5 5 5 2 . . . . . 
        . . . . . 2 2 5 5 2 2 . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . 2 2 5 5 5 2 2 . . . . . 
        . . . . 2 5 5 5 5 5 2 . . . . . 
        . . . 2 5 5 5 2 5 5 5 2 . . . . 
        . . . 2 5 5 5 2 5 5 5 2 . . . . 
        . . . 2 5 5 5 2 5 5 5 2 . . . . 
        . . . 2 5 5 5 2 5 5 5 2 . . . . 
        . . . . 2 5 5 5 5 5 2 . . . . . 
        . . . . 2 2 5 5 5 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . 
        . . . . . 2 2 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 5 5 2 3 2 . . . . . 
        . . . . . 2 2 5 2 3 2 . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . 2 5 2 3 2 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 3 2 . . . . . 
        . . . . . 2 5 2 3 2 2 . . . . . 
        . . . . . 2 2 2 2 2 . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 3 3 2 2 . . . . . 
        . . . . . 2 5 3 3 3 2 . . . . . 
        . . . . 2 3 3 3 2 5 3 2 . . . . 
        . . . . 2 7 3 3 2 3 3 2 . . . . 
        . . . . 2 3 3 3 2 3 3 2 . . . . 
        . . . . 2 3 3 3 2 7 3 2 . . . . 
        . . . . . 2 5 3 5 3 2 . . . . . 
        . . . . . 2 2 3 3 2 2 . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . 2 2 3 3 3 2 2 . . . . . 
        . . . . 2 3 3 3 3 5 2 . . . . . 
        . . . 2 3 5 3 2 3 3 3 2 . . . . 
        . . . 2 3 3 3 2 3 3 7 2 . . . . 
        . . . 2 3 3 3 2 3 3 3 2 . . . . 
        . . . 2 3 7 3 2 3 3 3 2 . . . . 
        . . . . 2 3 3 5 3 5 2 . . . . . 
        . . . . 2 2 3 3 3 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.pewPew.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f f f f f f f 5 f f . . 
        . . f f f f f f f f f . . . . . 
        . . f 2 f f f f f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    music.play(music.stringPlayable("C E D F E G F A ", 666), music.PlaybackMode.UntilDone)
    info.changeLifeBy(1)
    tileUtil.replaceAllTiles(assets.tile`myTile`, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile33`, function (sprite, location) {
    tileUtil.replaceAllTiles(assets.tile`tile33`, assets.tile`tile7`)
    pause(100)
    music.play(music.stringPlayable("C D E F C D E F ", 30), music.PlaybackMode.InBackground)
})
browserEvents.P.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("oh... you found it...")
    pause(1000)
    hero.sayText("OK FINE!!!!")
    pause(1000)
    hero.sayText("POLTERGEIST MODE!!!")
    pause(1000)
    hero.setFlag(SpriteFlag.Ghost, true)
    controller.moveSprite(hero)
})
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
        effects.clearParticles(hero)
        info.startCountdown(300)
        music.play(music.createSong(assets.song`Underground`), music.PlaybackMode.LoopingInBackground)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal, scroller.BackgroundLayer.Layer4)
        scene.setBackgroundImage(img`
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeefdbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeee
            eeeeeeeeffbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefdbfeeeeeeeeeeeeeeeeeeee
            eeeeeeeefddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbddfeeeeeeeeeeeeeeeeeeee
            eeeeeeeefbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddddffeeeeeeeeeeeeeeeeeee
            eeeeeeeeffffbdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddbffeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeffddfffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffddffeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffbdddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeee
            eeeeeeeeeeeeeefddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffdbffffeeeeeeeeeeee
            eeeeeeeeeeeeeefbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffdddbfeeeeeeeeeeee
            eeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddddfeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbffeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdfeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeefffddddddddddddffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeffddddddddffffdddffdddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeffdddfffddfffffdddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeffdddfffffdffffddddddbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeffdddffffffddddddddbfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeefddddfffffdddddddfdffdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeefdddddfffddddfffdffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeefdddddddddffffefffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeffdddbbbbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeefffffbddddbbffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeefdffefdddddddddffffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeefddfffddddddddddffddddfdfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeefffbbdfffdddddddddddddddbdbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeefffddfffffeffddddddddddddddddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeefdbbdddfbfeeffffddddddffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeefddbbfffdfeeeeeffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffffdddfefdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeefbbfffffffddffeeeeffffeeeeefffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffbbbfffdbdddffffefddbfffffbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeefffffdfdbbdddddfefdddddddbbbbddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffbbbfdbddbbbffffefffffdddbddbfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeefbbfffdbbdddffffffeeeeffffbbbdfffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeefffffbddbbdddddddfeeeeeeeffdbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefddbffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeefbbfdbbddbbfffffffeeeeeeffddfdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeefbffdbbbdddddddfeeeeeeeefddffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffbdddbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffffdddbbfffffffeeeeeeeeffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddfffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeffdffdddfeeeeeeeeeeeeeeeeeeffdffdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeffddffffffeeeeeeeeeeeeeeeeeefddffdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeefddbffffeeeeeeeeeefffffffeeffddffdbfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffbdffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeffbbfddfeeeeeeeeeefddbbdffefddfffddfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefbdddffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eefeeeeeeeeefdddbbffeeeeeeeeffddbdddfefdffffbdfeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeefddddfeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeefefffbbddfeeeeeeeefddfffddfffffeffbffeeefeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeefeffbddfeeeeeeeeeeefeeeeeeeeeeeeeeeeeeeefeeeeeeeeeeeeeeeeeefeeeeeeeeee
            eeefffffeeeeeefdddbffeeffffffddfeffddfffeefdbfffeeeeeeeeeeefeeeffffeeeeeeeefeeeeeeefffffeeeeeefdbfefeeeffffeeeeeeeefeeeeeeefffffeeeeefffffefeeeffffeeeeeeeefeeee
            effffeffffeeeefdfbbdfffffffbddfffeffdffeeffddfffffeeeeffeeeeeffffffffeeffeeeeefeeffffeffffeeeeffffeeeffffffffeeffeeeeefeeffffeffffeeefbdbfeeeffffffffeeffeeeeefe
            fffffffffffeeefffbdbffddddffbdfffeefffeefffbdffffffeeeffeeeeffefffffffeffeeeeeeefffffffffffeeeffeeeeffefffffffeffeeeeeeeffffffffffffffdddfeeffefffffffeffeeeeeee
            feefffffffffeeeefddffbdffddfbbfeeeeeeeefffdbbfffffffeeeeeeeffffffffffffeeeeeeeeffeefffffffffeeeeeeeffffffffffffeeeeeeeeffeefffffffffbdddbffffffffffffffeeeeeeeef
            feefffffffffffeefffffddfffdefffffeeeeffffbddffffffffffeeeffffffffffeeffffeeeeffffeefffffffffffeeeffffffffffeeffffeeeeffffeefffffffffddddddbffffffffeeffffeeeefff
            fffffffffffffffffffffdddffdddfffffffffffdbbdfffffffffffffffffffbdbfeeffffffffffffffffffffffffffffffffffffffeefffffffffffffffffffffffbddbddddbfffffffefffffffffff
            ffffffffffeeffffffeefffddddddffffffffdbddfffffffffeeffffffeefffdddfffffeffffffefffffffffffeeffffffeefffffffffffeffffffefffffffffffeffffffbddddbbddbffffeffffffef
            ffffffffffeeffffffeefffddddddfffddbbddbdffffffffffeeffffffeefffbdddbffffffeeffffffffffffffeeffffffeeffffffffffffffeeffffffffffffffeefffffffbdddddddfffffffeeffff
            ffffffffffffffefffffffffdddddffddfbddfffffffffffffffffeffffffbddddddffffffeeffffffffffffffffffefffffffffffffffffffeeffffffffffffffffffefffffffdddddfffffffeeffff
            fffffffffffffffffffffffffdddfffffffffffffffffffffffffffffffbddddbddbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddbffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffbddbbddddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbddfffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffdddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffbdddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffddbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            `)
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        music.stopAllSounds()
        info.startCountdown(300)
        music.play(music.createSong(assets.song`Deepground theme`), music.PlaybackMode.LoopingInBackground)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal, scroller.BackgroundLayer.Layer4)
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffcc
            ffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffff
            fffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffff
            ffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffff
            fffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffffffff
            fffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffff
            fffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffffffffcccccccccccccccccccccccccccccccccccccccccccccccffffffffffffffffffffff
            fffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffff
            fffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccccccccccccccccfffffffffffffffffffffff
            fffffffcccccccccccccccccccccccccccccccccfffccccccccccccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccccccccccccccccffbbbbbbbbbbbbbffffffff
            fffffffccccccccccccccccccccccccccccccfffffffcccccccccccccccccccccccccccccccccccccccffffffffffccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbfffffff
            fffffffccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccccccccccffffffffffcccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffccccccccccccccccccccccccccffffffffffffccccccccccccccccccccccccccccccccccccccfffffffffffcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffcccccccccccccccccccccccccfffffffffffffcccccccccccccccccccccccccccccccccccccffffffffffffcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccccccccccccfffffffffffffcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffcccccccccccbccccccccccccffffffffffffffccccccccccccccccccccccccccccccccccccfffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffcccccbbbbbbbbcccccccccccffffffffffffffccccccccccccccccccccccccffcccccccccffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffccbbbbbbbbbbbcccccccccccfffffffffffffffccccccccccccccccccccccfffffffccccfffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffbbbbbbbbbbbbbccccccccccffffffffffffffffcccccccccccccccccccccffffffffffccfffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffbbbbbbbbbbbbbccccccccccffffffffffffffffcccccccccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffffbbbbbbbbbbbbbbcccccccccffffffffffffffffcccccccccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffffbbbbbbbbbbbbbbbbcccccccccffffffffffffffffccccccccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            ffffbbbbbbbbbbbbbbbbbccccccfffffffffffffffffffccccccccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            ffffbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffccfffcccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffccffffccccccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffff
            fffbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffcccccccccccccffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffff
            ffbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffccccccccccccffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffff
            ffbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffcccccccccccfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffff
            fbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffcccccccccccffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffff
            fbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffcccccccccccfffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffff
            fbbbbbbbbbbbbbbbbbbbbffffffffffffbbbbbffffffffffffffffcccccccccccffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffff
            bbbbbbbbbbbbbbbbbbbbbbfffffffffffbbbbbbbffffffffffffffcccccccccccfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbffffffffffbbbbbbbbffffffffffffffccccccccccffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbffffffffffffffffffffffcffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            `)
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        music.stopAllSounds()
        info.startCountdown(300)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal, scroller.BackgroundLayer.Layer4)
        music.play(music.createSong(assets.song`Lava Ground`), music.PlaybackMode.LoopingInBackground)
        scene.setBackgroundImage(img`
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbb
            bbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbb
            bbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbb
            bbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbb
            bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333b
            33bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbbb
            c3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbcccb
            ccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbccb
            ccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbccccccccccb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccb
            bbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbb
            bbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
            bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
            bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
            bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
            3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
            333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
            cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
            cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
            cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
            cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
            bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbbbbb333333bbb33bbbbbbbbbbbbbbbbb33bbbbbbb
            bbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bbbbb33333bbbbbbbbbbbbbbbbbbbbbbbbbbbbb3bb
            bbbbbb222222222222222222222bbbbbbbbbbbbbbbbbbb222222222222222222222bbbbbbbbbbbbbbbbbbb222222222222222222222bbbbbbbbbbbbbbbbbbb222222222222222222222bbbbbbbbbbbbb
            bbbb2222222222222222bbb2222222bbbbbbbbbbbbbb2222222222222222bbb2222222bbbbbbbbbbbbbb2222222222222222bbb2222222bbbbbbbbbbbbbb2222222222222222bbb2222222bbbbbbbbbb
            bb2222222222222222222bbbbbb222222bbbbbbbbb2222222222222222222bbbbbb222222bbbbbbbbb2222222222222222222bbbbbb222222bbbbbbbbb2222222222222222222bbbbbb222222bbbbbbb
            2222222222222222222222bbbbbbbbbbbbbbb2222222222222222222222222bbbbbbbbbbbbbbb2222222222222222222222222bbbbbbbbbbbbbbb2222222222222222222222222bbbbbbbbbbbbbbb222
            22222222222222222222222222bbbbbbbb22222222222222222222222222222222bbbbbbbb22222222222222222222222222222222bbbbbbbb22222222222222222222222222222222bbbbbbbb222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            `)
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        music.stopAllSounds()
        info.startCountdown(300)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections, scroller.BackgroundLayer.Layer4)
        music.play(music.createSong(assets.song`SpoOoOoOoOky`), music.PlaybackMode.LoopingInBackground)
        music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.LoopingInBackground)
        scene.setBackgroundImage(img`
            fffffffcbccffffffffffcfbddddddddddd111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbffcddffffffcfcfffff
            fffffffccffffcffffffbfddddddddd11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfccdbffffffffffffff
            fffffffcffffffbffffffddddddddd1111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffcbfffffffffffcdcf
            ffffffcffffffffbdffffddddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffdfbfffffff
            fcfffffffcdcdffdffdccdddddd11111111111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbffffffdffffffff
            fffffffffdbddcfffffcddddd1111111111111111111111111111111111111111111dddd1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfcfffffcfffbfff
            fcffffbffbffffffffbbddddd111111111111111111111111111111111111111111d11dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbdcfffffffffbffff
            fcbffffffcfffffffcdddd1111111111111111111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccffffffffffffff
            fdcccffffdbffcffccdddd111111111111111111cc1111111111111111111111111d111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffff
            fffffffffffffffcdddd1111111111111111111cccc111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfcfffffffffffff
            ffffffffffffffcbddd11111111111111111111cccc11111111111111111111111111111dddd1ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffffff
            fffffffddcfffdddddd11111111111111111111ccccc11111111111111111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffff
            fffffffdddbffbddd111111111111111111111cccccc111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffcffffffffff
            ffffffcbfcccddddd111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfffffffffffff
            fffffffffcfddddd1111111111111111111111ccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcffffffffffff
            ffffffffdfcdddd1111111d11111d111111111cccccccc11111111111111111111111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfbfffcfffffff
            ffffffffcfbddd11111111111111111111111ccccccccc1111111111111111111111111111111111d1dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfffdffffffff
            fffffffcdcdddd11111111111111111111111cccccccccc1111111ccc111111111ccc111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffff
            fffffbfffcddd11111111111111111111111ccccccccccc1111111cccc111c1111ccc11111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
            fccffdcbfbddd11111111111111111111111cccccccccccc111111cccc11ccc111ccc1111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
            fffcffcdfbdd11111111111111111111111ccccccccccccccc1111cc1c11ccc11cccc111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffffffff
            ffddfffbbbdd1111111111111111111111cccccccccccccccc1111cc1c11ccc11c11c111111111111111dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddcfccfffffffff
            cfdffffbcdd11111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbfcdfffffffff
            ffffffccdd111111111111111111111111cccccccccccccccc1111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddccfbfffffffff
            ffcfffbdb111111111111111111111111111cccccccccccc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbdddddddddddddddcfdbffffffff
            fffffcddddd1111111111111111111111111cc1cc1ccd1cc111111ccccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbfcfffffffff
            fffffbdddd11111111111111111111111111cc1cc1ccc1cc1111111ccccccccccccc1111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddcfcfffffffff
            ffffcbddddd1111111111111111111111111cccccccccccc11111111ccccccccccc11111111111111111d1ddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbcfffffffffff
            fffccddddd11111111111111111111111111cccccccccccc111111111cccccccccc11111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbdddddddddddddddbbffffffffffff
            ffdcbddddd11111111111111111111111111cccccccccccc111111111ccccccccc111111111111111111ddddddddddddddddddddddddddddddddddddddddddddddbddddddddddddddddbffffffffffcf
            ffccddddddd11111111111111111111111111cccccccccc1111111111ccccccccc1111111111111111111dddddddddddddddddddddddddddddddddddddddddddddbddddddbbdddddddbcffffffffffff
            ffcbdddddd1111111111111111111111111111cccccccc11b11111111ccccccccc111111111111bb1111ddddddddddddddddddddddddddddddddddddddddddbbddbbdddddbbdddddddbccfffffffffff
            ffcbddddd111111111111111111111111111111cccccccbccccccc111ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbddbddddddbddddddddfffffffffffff
            fcbbdddddd1111111111cccb1ccc1111cccc111ccccccccccccccccc1ccccccccc1111111111111b1111dddddddddddddddddddddddddddddddddddddddddddbbbdbbdddddbdbddddbbbcfffffffffff
            fcddddddd1111111111ccccb1cccc11ccccc111cccccccccbbccbbbccccccccccc1111111111111b111ddddddddddddddddddddddddddbdddddddddddddddddddbddbbddddbbbddbbbcfffffffffffff
            ccddddddd1111111111cccccbcccc11ccccc111cccccccccbbcccbbccccccccccc111111111111111111dddddddddddddddddddddddddbbdddddddddddddddddddbddbddddbbddbbbbffffffffffffff
            ddddddddd1111111111ccc1ccccccccc1ccc111ccccccccccccccccccccccccccc1111111111111b111bdddddddddddddddddddddddddbbdddddddddddddddddddbbbbddddbddbbbbccfffffffffffff
            dddddddd11111111111cc11ccc11cccc1ccc111ccccccccc1111cccccccccccccc1111111111111b111bddd1dddddddddddddddddddddbdddbdddddddddddddddddbbbddddbbbbbbbccfffffffffffff
            dddddddd11111111111cccccccbcccccccccc11cccccccc1111111cccccccccccc1111111111111b111bddd1dddddddddddddddddddddbddbbdddddddddddddddddbbbdddbbbbbbbbccfffffffffffff
            dddddddd11111111111ccccccccccccccccc111ccccccc1111b1111ccccccccccc1111111111111b1dbb1ddddddddddddddbbbbddddddbddbdddddddddddddddddddbbdddbbbbbbbccffffffffffffff
            dddddddddd111111111cccccccccccccccc1bb1ccccccc1111bb111ccccccccccc11111b1111111b1dbbdddddddddddddddbddbbbddddbdbddddddddddddddddddddbbddbbbbbbbbcbffffffffffffff
            dddddddddd1111111111cccccccccccccccccccccccccc111111111cccccccccccbb11111111111b1db1dddddddddddddddbdddbbddddbbdddddddddddddddddddddbbdbbbbbbbbccfffffffffffffff
            dddddddddd11111111111cccccccccccccbccbbccccccc1111111b1cccccccccccbbbb111111111b1db1ddd1ddddddddddbbdddbbbddbbdddddddddddbbddddddddbbbbbbbbbbbcbbcffffffffffffff
            ddddddddd1d11111111111ccccccccccccbbcbbccccccc1111111b1cccccccccccc1b1111111111bbbddddd1dddddddddbbdddddbbdbbddddddddddddbdddddddddbbbbbbbbbbccbcfffffffffffffff
            ddddddddd1d11b11111111ccccccccccccbccbcccccccc111111bb1cccccccccccc111111111111bbbdddddddddddddddbbdddddbbbbbddddddddddddbdddddddddbbbbbbbbbbbbcffffffffffffffff
            ddddddddd1d11b11111111cccccccccccccccccccccccc1111111bbcccccccccccc11111111111bbbdddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbccfffffffffffffffff
            dddddddddddddbbd1bb111cccccccccccc111d1cccccccd1d1111bbcccccccccccc11111111111bbb1ddddddddddddddddddddddbbbbddddddddddddbbdddddbddbbbbbbbbbbbbccffffffffffffffff
            dddddddddddddbbd1b1111ccccccccccccddbccccccccccc1ddddbccccccccccccc11111111bb1bb11dddbddddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
            ddddddddddddddbd1b11bbccccccccccccccccccccccccccbcccccccccccccccccb1d111111bbbbbdddddbbdddddddddddddddddbbbbddddddddddddbbdddddbdbbbbbbbbbbbbcffffffffffffffffff
            ddddddddddddddbb1b11bbccccccccccccccccccccccccccccccccccccccccccccd1111b1111bbb11ddddbbdddddddddddddddddbbbbddddddddddddbbdddddbbbbbbbbbbbbbbcffffffffffffffffff
            dddddddddddddddb1b1db1ccccccccccccccccccccccccccccccccccccccccccccc1111d1111bbb11dddddbbddddddddddddddddbbbbbddddddddddddbdddddbbbbbbbbbbbbbbbcfffffffffffffffff
            ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1111d1111bbbddddddddbddddddddddddddddbbbbbddddddddddddbbdddbbbbbbbbbbbbbbbcffffffffffffffffff
            ddddddddddddddddbb1bbdccccccccccccccccccccccccccccccccccccccccccccb1b11d1111bbbddddddddbbdbbddddddddddddbbbbbddddddddddddbbddbbbbbbbbbbbbbbbcfcffffffffffffffcff
            ddddddddddddddddbb1b11cccccccccccccccccccccccccccccccccccccccccccccbbb111111bbbddddddddbbdbdddddddbbddddbbbbbdddddddddddbbbbbbbbbbbbbbbbbbbccfffffffffffffffffff
            ddddddddddddddddbddbd1ccccccccccccccccccccccccccccccccccccccccccccbbb111d111bbbb1dddddddbbbdddddddbbddddbbbbbddddddddbdbbbbbbbbbbbbbbbbbbbbcfcffffffffffffffffff
            ddddddddddddddddbbb111cccccccccccccccccccccccccccccccccccccccccccc1bb1111111bbbbddddddddbbbdddddddbdddddbbbbbddddbdddbdbbbbbbbbbbbbbbbbbbbbffffffffffffffffffcff
            ddddddddddddddddbbd111ccccccccccccccccccccccccccccccccccccccccccccd1bbb11111bbbbdddddddddbbddddddbbdddddbbbbbdddbbdddbbbbbbbbdbbbbbbbbbbbbcfffffffffffffffffffff
            ddddddddddddddddbbdd1dcccccccccccccccccccccccccccccccccccccccccccc111bb11111bbbbdddd1ddddbbddddddbbdddddbbbbbdddbbddddddbdddddddddbbbbbbbbcfffffffcfffffffffffff
            dddddddbbdddddbbbbddddcccccccccccccccccccccccccccccccccccccccccccc111bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbddddbdbdddddddddddddddddddddddfffffffffffffffffffff
            dbddddddddbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccbcccccb11bb1111bbbbbdddddddddbbbdddddbbdddddbbbbbbdddddddddddddddbddddddddddbbcfffffffffffffffffffff
            ddbddbddbbbbbbbbbbbbbbcccccccccccccccccccccccccccccbccccccccccccccd11b11111bbbbbbddddddddbbbdddddbbddddbbbbbbdddddddddddddddddddddddddddbcffffffffffffffffffffff
            dbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccc111bb111bbbbbbbbdddddddbbbbddddbbdddbbbbbbddddddddddddddddddddddddddbbbcdfffffffffffffffffffff
            bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbb1bb1bbbbbbbbbbbbdddddbbbbddddbbddbbbbddbbdddddddddddddddddddbddddbccfddfffffffffffffffffffff
            dbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddbdddddddddddddbcffffffffffffffffffffffffff
            bbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbdbddddbdddddddddddddddddddddddddddccffffffffffffffffffffffffff
            bbbbbbbbddbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbddddddddddbddddddddddddddddddddddbdddddbbbffbdfffffffffffffffffffffff
            bbbbbbbdddddbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbddddbddddddddbdddddddddddddddddddddddddddbddfcbfdffffffffffffffffffffff
            bbbbddddddddddddddbbbbcccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbdddddddddddddddddddddddddddddddddddddddddddddddddbdffdffbcfffffffffffffffffffff
            bbbddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccbbbdbbdbdddddddbddddbddddddddddddddddddddddddddddddddddddddcffcdfffffffffffffffffcfffffff
            bbdddddddddddddbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbcccbbbbbddbdddddddddddddddddddddddddddddddddddddddddddddddddbcdffdfcdfffffffffffffffffffffff
            bddddddddddddddbdbbbbccccccccccccccccccccccccccccccccccccccccccbcbbbcbddddddddddddbddddddddddddddddddddddddddddddddddbddddddddddbfcffffcffffffffffffffffffffffff
            ddddddddddddddddbdbbbcccccccccccccccccccccccccccccccccccccccccbbcddddcdbddddbbddddbbdddddddddddbdddddddddddddddddddbddddddddddddcbdffffffffffbfffffcffffffffcbff
            dbdbddddddddbdbdbbbbccccccccccccccccccccccccccccccccccbcccbcbbdbcddddddddddddddddddddddddbddddddddddddddddddddddddddddddddddddddcffffffffffffffffffffffffcfffddf
            ddddddbddddddddbbbbbcccccccccccccccccccccccccccccccbbcbccbbbbdbdddddddddddbbbddddddddddddddddddddddddddddddddddddddddddddddddddbffffffffffffffffffffffffcdfffcff
            ddddddddddddbdbbbbbbccccccccccccccccccccccccccccccbbbbbbdddddddbddddddddddddbddddddddddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffdffff
            dddddddddddddbbbbbbcccccccccccccccccccccccccccccbbbcddddbdbcdddcddddddddddddddddbdddbddddddddddbdddddddddddddddddddddddddddddddccfffffffffffffffffffffffffffffff
            ddddddddddddbbbbbbbcccccccccccccccccccccccccccbbddddddddbdbddddbdddddddddddddddddddddddddbbbddddddddddddddddddddddddddddddddddcfcffffffffffffffffcffffffffffffff
            bdbddddddbddbbbbbbccccccccccccccccccccccccccbddddbbdddddddddddddddddddbddddddddddddddddddddddddddddbdbdddddddddddddddddddddddbffffffffcffffffffffffffffcfcffffff
            dbddbdddddddbbbbcccccccccccccccccccccccccccdbdbdddddddddddddddddddddddbddddddddbdcbddddddddddddddddddddddddddddddddddddddddddcfffffffffffffffffffffffffffcffffff
            dddddddddddddddddbcbcccccccccccccccccccccbddcbbcdddbddddddddddddcdbddddddddddddddddddddbdddddddddddddddddddddddddddddddddddddfffbffffffffffffffffffffffffffcffff
            ddddddddddddcddddddbbccccccccccccccccbcbcbddddddbdbcddddddddddddddddddddddddddcbddddddddddddbdddddddddddddddddddddddddddddddcfffdfffffffffffffffffffffffffffffff
            dddddddddddbcdddddbddcbbcccccccbcccbbbbbccddbddddbdbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddbffffcfffffffffffffffffffffffffffffff
            bdddddddddcdddddddddbcbbbcbbbcbbbdddbddddbddddddddddddddddbddddddddddddddddbcdddcddddddddddddddddddddddddddccddddddddddddddbddfffffffffffcffffffffffffffffcccfff
            ddddddddddddbddddbdddbbdbcbddbdbddddddddddbdddddddbdddddcddddddddddddbddddddddddddddddbddddddddbdddddddddddddddddddddddddddcdfffffffffffffffffffffffffffffccfffc
            dddcdddddddddddddddddcdddddddbdbbbdddbddddddddddddccdddddbddddddddcddddddddcddddddddddddddddddddddddddddddddddddddddcddddddcffffffffffffffffffffffffffffffffffff
            dddbdddddddddddddddddcdddddddcbddddbbddddddcdbddbdddddddddddbcbbbdcbddddddcbddddddddddddddddddddddddddddbddddddddddddddddddcfffffffffffffffcffffffffffffffffffff
            bdddddddddddddddddddddddddddbddbdbcbdbbddddbdddddddddddddbbbbbbcbbbbcdbbddddbddbcddddddddddddddddbdddddddddddddddddddddddddcffffbdcffffffffcffffffffffcfffffffff
            dddddddddddddddddddddddddddbbdddddbcdddddddbddddcdbbdbbbbcccbbccccbcbcbbbbbbbbccbcbbbdbbbbddddddddddddddddddddddddddbbbbdddcffffcfbfffffffffffffffffffffffffffff
            dddddddddddddddddddbdddddcbbddddddbbdddddddbbddddbbbbbccccccccccccccccccccccccccccbccbcbbccbdbbdddddddddddddddddddbbbbbbddbccfddfffffffffffbbfffffffffffffffffff
            bbbdddddddbddddddddddddbddcddbdddddbbddbccbcccbbcbbbcbccccccccccccccccccccccccccbcccccccccccccbbbdddddddddddddbbbbccccbbddccfffffcffffffffffffffffffffffffffffff
            cccbddddddddddddddddddddddbdddddbbbcbcccccbcccccccccccccccccccccccccccccccccccccccccccccccccccbccccbdbdddbdbbbcccbccbbbdddbfffffdfffffffffffffffffffffffffffffff
            ccccddbdddddddddddcddddccbbbccbbcbbccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbdddddfffffffffffffffcfffffffffffffffffffff
            ccbbbbbddddddddddbcdddcccccccccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccbbddddddbfffffffffffffffffffffffffffffffffffff
            ccccccbcbbbdddddbcccbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbddddddddbfffffffffffffffffffffffffffffffffffff
            cccccccbccbbbcbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbdddddddddbcffffffffffffffffcbfffffffffffffffffff
            cccccccccccbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbccccccccccccccccbbdddddbdddbcfffffffffffffffffffffffffffffffffffff
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbbcccccccccccccbbbbddddddddddbcffcffffffffffffffffffffffffffffffffff
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbbcccccbbcccccccbbbbdddddddddddbccffffffffffffffffffffffffffffffffffff
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcbddddddbbcbbbdbccccbbdddddbdddddddddcffdffdffffffffffffffffffffffffffffffff
            cccccccccccccccccccccccccccccccbbccccccccccccccccccccccccccccccccccccccccbcccbbbbbbddddddddddddddbbbbbbdddddcdddddddddddbcfffffffffffffffffffffffffffffffffffffc
            cccccccccccccccccccccccccccccbbddcbccccbccccccccccccccccccccccccccccccbdbbbbddddbdddddbddddddddddddddddddddddccdddddddddcfffffffffffffffffffffffffffffffffffffff
            cccccccccccccccccccccccccccbbbcddbbcbbbbbccbbcccccccccccccccccccccbbbddddbbdddddbdccddbdddddddddddddddddddddddddddddddbcffffffffffffffffffffcfffffffffffffffffff
            ccccccccccccccccccccccccccbddddddbbbbddbbbbdbccccccccccccccccccbcddddddddddbddcbdccbddddddddddddddddddddddddddddddddcbfdffffffffffffffffffffffffffffffffffffffff
            cccccccccccccccbccccccccbcdddddddddbddddddbbbddbbbbccccccccccccdbdddddddddddbddddddddddddddddddddddddddddddddddddddcfcfffffffffffffffffcbffffffffffffffcffffffff
            cccccccccccccccccccccfccccbddddddddddddddbcbcdddddbbbcccccbbbcdddddddbdddddddddddddddddddddddddddddddddddddddddddcdffbffffffffffffffffffbffffffffffffcbcffffffff
            ccccccccccccccccccfccffffccbdddddddddddddddbdbddddddcdbcbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffdffcfffffbfffffffffdccfffffffffffffffffffff
            cccccccccccccccffcffcccffffccdddddddddddddcccdddddbdbddbdddddddddddddddddddddddddddddddddddddddddddddddddddddddbcffffffddfffffffffffffffddffffffffffffffffffffff
            cccccccfccffffcffffffcdfffffcfddddddddddddbccbddddbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbcfffffffffdfffffffffcffffffffffffffbffffffffffffff
            ccfcccfffffffffffffffffffffcfccddddddddddbdcdddddddddddddddddddddddddddddddddddddddddddddbccbbccbcbbbdbbbdbfffdffffffffffffffffcfffffffffffffddfffffffffffffffff
            cffcccffffffffffffffffffffffbcfcdddddddddccbdbdddddddddddddddddddddddddddddddddddddddbddfccccbfcfffffcbcfffcffcffffffffffccfffcffffffffffffffdbfffffffffffffffff
            fcfffffffffffffffffffffffffffffbcbbdddddbcbcdbbbcbdbddddddddddddddddddddddddddddddbbccffffffffffffffffcbfffffffffffdffffcfffffffffffffffffffccffffffffffffffffff
            fffffffffffffffffffffffffffffffcfffcdcfffcbcfcbccfccbddddddddddddddddddddddddddddbbbcfffffffffffffffffffcdbffffffffffffcdfdfffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffcffffffdffdfcffffccddddddddddddddddddddddddbdccfffffffffffffffffffffcffffcffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffdfffffbfbfffffbcfbffffffcccbcbcbdddddddddddddccccffffffffffffffffffffffffffffffffffffffffffcfffffffccfffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffccffffffffffffffdfdcfffffddffcffccccffbdbbbdddcfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffffffffffffffffffffffff
            fffffffffffffffffffcffffffffffffffffffffffffffffffffddfcfbfffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffcfffffdcfffddffffffffffffffffbffffcbffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffcfffff
            ffffffffffffffffffffffdfffffffffcfffffffbffffffffffdffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffbffffdfffcddcfffffffffffffffff
            fffffffffffffffffffffffffffffffffbffffffbffffffffffffffffffffffbfcffffcfffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffdddffffffffffccffffff
            `)
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        info.startCountdown(300)
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Pizzarea Theme piece 1`), music.PlaybackMode.LoopingInBackground)
        music.play(music.createSong(assets.song`Pizzeria Theme piece 2`), music.PlaybackMode.LoopingInBackground)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections, scroller.BackgroundLayer.Layer4)
        scene.setBackgroundImage(img`
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff11111111111ffffffffff111
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fffffffffff1111111111fff
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            `)
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Underwater Theme`), music.PlaybackMode.LoopingInBackground)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal, scroller.BackgroundLayer.Layer4)
        info.startCountdown(300)
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999ddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999d9d9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999ddd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999ddd9999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999d9d9999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999ddd9999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999ddd9999999999999999999999999999999999999999999999999999999999999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999d9d9999999999999999999999999999999999999999999999999999999999999999999999999999999
            999999999999999999999999999999999999999999999999999999999999999999999999999999ddd9999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            99999999999999999999999999999999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            99999999999999999999999999999999999999d9d99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            99999999999999999999999999999999999999ddd99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999ddd99999999999999999999999
            99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999d9d99999999999999999999999
            99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999ddd99999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            `)
        tiles.setTilemap(tilemap`level_4`)
        sprites.destroy(mySprite)
    } else if (level == 6) {
        info.startCountdown(300)
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Restaurant Theme`), music.PlaybackMode.LoopingInBackground)
        scene.setBackgroundImage(img`
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffeeeeeeeeeeeeeeeeeeeeeeeffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeef22fffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffff22feeeeeeeeeeeeeeeeeeeeef22fffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffff22feeeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeeeef222f2222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeeeef222f22222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222feeeeeeeefffffffffffffffffeeeeeeeef222222f222feeeeeeeeeeeeeeeeeeef222f222222feeeeeeeefffffffffffffffffeeeeeeeef222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222222ffeeeeeeef221122112211221feeeeeeeff222222f222feeeeeeeeeeeeeeeeeeef222f222222ffeeeeeeef221122112211221feeeeeeeff222222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22222f22fffeeeef221122112211221feeeefff22f22222f222feeeeeeeeeeeeeeeeeeef222f22222f22fffeeeef221122112211221feeeefff22f22222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2222f222222ffeef112211221122112feeff222222f2222f222feeeeeeeeeeeeeeeeeeef222f2222f222222ffeef112211221122112feeff222222f2222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222f222222222fef112211221122112fef222222222f222f222feeeeeeeeeeeeeeeeeeef222f222f222222222fef112211221122112fef222222222f222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f222f22222222ffff221122112211221ffff22222222f222f222feeeeeeeeeeeeeeeeeeef222f222f22222222ffff221122112211221ffff22222222f222f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f22f22222222f2f2f221122112211221f2f2f22222222f22f222feeeeeeeeeeeeeeeeeeef222f22f22222222f2f2f221122112211221f2f2f22222222f22f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2f222222222f2f2fffffffffffffffff2f2f222222222f2f222feeeeeeeeeeeeeeeeeeef222f2f222222222f2f2fffffffffffffffff2f2f222222222f2f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222f2f22222222f22f22fffffffffffffff22f22f22222222f2f222feeeeeeeeeeeeeeeeeeef222f2f22222222f22f22fffffffffffffff22f22f22222222f2f222feeeeeeeeeeeeeeeeee
            eeeeeeeeef2222ff2222222f222f22ffffffbbfffffff22f222f2222222ff2222feeeeeeeeeeeeeeeeeeef2222ff2222222f222f22ffffffbbfffffff22f222f2222222ff2222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222222fff222f2222f22ffffffbbfffffff22f2222f222fff222222feeeeeeeeeeeeeeeeeeef222222fff222f2222f22ffffffbbfffffff22f2222f222fff222222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222222222fff22222f22ffffffbbfffffff22f22222fff222222222feeeeeeeeeeeeeeeeeeef222222222fff22222f22ffffffbbfffffff22f22222fff222222222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222222222222f2222f22ffffffbbfffffff22f2222f222222222222feeeeeeeeeeeeeeeeeeef222222222222f2222f22ffffffbbfffffff22f2222f222222222222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222222222222f2222f22ffffffbbfffffff22f2222f222222222222feeeeeeeeeeeeeeeeeeef222222222222f2222f22ffffffbbfffffff22f2222f222222222222feeeeeeeeeeeeeeeeee
            eeeeeeeeef222222222222f2222f22fffffffffffffff22f2222f222222222222feeeeeeeeeeeeeeeeeeef222222222222f2222f22fffffffffffffff22f2222f222222222222feeeeeeeeeeeeeeeeee
            ffffffffff222222222222f2222f2222222222222222222f2222f222222222222fffffffffffffffffffff222222222222f2222f2222222222222222222f2222f222222222222fffffffffffffffffff
            bbbbbbbbbf222ffffffffffffffffffffffffffffffffffffffffffffffffff22fbbbbbbbbbbbbbbbbbbbf222ffffffffffffffffffffffffffffffffffffffffffffffffff22fbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            `)
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        info.stopCountdown()
        music.stopAllSounds()
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccefffccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefcccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeefffccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2efeeeeeeeeeeeeeeeeffffffcccccffff
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeffffeee2eeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffeeeeeeefffffffffffffe
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffeeeeeefffeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeffeeeffeeeeeeeeeeeeeeeeeeeef2ffeee
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeefeeeefffffffffeeeeeeeeefffffeeefffffffffeeeee
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeefeeeeeeeeeeffffffeeeeeffffefffffffffffffffffffffeeeeffeeeeeeeeefffffffee2eeee
            ccccccceeeeefccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeefeeefeeeeeeeeeeeeeeeeeeeeeeeffffeeeeffffffffffffffffffffffffffeeeeeeeeeeeeffffffffffeeeeeeee
            ccccceeee2eeeeeccccccccccccccccccccccccccccccccffeeeeffffeeee2eeeeeefffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffeeeeeeffffffffffffffffeeeeeeeeb
            ccceeeeeeeeeeeeeeecccccccccccccccccccccffeee2eefee2eefffffffffffffffffffffffffffffffffffffeeeeeeeeeeefffffffffffffffffffffffffffffeefffffffffffffffffeeeeebbbbbb
            efffeffeeeeefffeeeeeeecccccccccffeeeeeeeeeeeeeeffffffffffffeeeeeeeefffffffffffffffffffffffffffeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffeeeeebbbbbbbb
            fffffffffeeffffffeeeeeeeeeeeffeeeeeeeeeeffffffffffffffeeeeeeeeeeeeeeeefffffffffffffffffffffffffffeeeeeeffffffffffffffffffffffffffffffffffffffffffbbbebbbbbbbbbbb
            ffffffffffffffffffffffeeeeeeefeffffffffffffffffffeeeeeeeeeeee2eeeeeeeeeeeeffffffffffffffffffffffffffeeeeeeeeffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbb
            eeeeeeffffffffffffffffffffffffffffffffffffffbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffeeeeeefffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbb
            eee2eeeeeefffffffffffffffffffffffffffffffbeeeeeeee2eeeeee2eeeeeeeeeee2eeeeebeeeefffffffffffffffffffffffffffffeffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeb
            eeeeeeeeeeeeefffffffffffffffffffffffffbeeeeeeeeeeeeeeeeeeeeeebbbeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeeeeee
            eeeeeeebbbeeeeeeffffffffffffffffffffbbeeeeeeeeeeeeeeeebbbbbbeeebbeeeeeeeeeeeeeeeeeeeeebbbffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbeeeeeeeeeeeee
            bbbbeeebbbbbbeeeeeffffffffffffffbbbeeeeeeeebeeebbbeebbbbbbbbbebbbbbbbbbeeeebbeeeebeeeeeeeeebbffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbeeeebffffffbbbbbbbbeeeebbbeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeebeeeeeeebbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeebbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbfeeeeeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffeeeeeeeeeeee2eeeeeefee
            bbbbbbbbebeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffeeeeeeeeeeeeeeeeeeeee2eeee
            bbbbbeeeeeeeeeeebeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffeeeeeeeeeeefeeeeeeeeeeeeeeeeeeee
            bbbeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffeeeeeeeeeeefeeeeef2eeeeeffeefeeeeef
            bbeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeefffffffffffeeeefeeefeeeeeeeefeeeeffffeeffeeeeef
            bbeeeeeeeeeeeeeeeeeeeeeeeeeebbebbbbbbbbbbbbbbbffeeeeeeeee2eeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeee2eeefffffffffffffeeeeeeeefeeefeeeeffffeeffeeeeeef
            beeeeefeeeeeeeeeeeeeeeeeeeeeefeeeeeeebbbfeeeeeeeeeeeeeeeeeeeeeffeeeeeefbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeffefffffffffeeeeeffffffeeeeeefffffeefffeeeeeff
            beeeefffeeeeeeeeeeeee2eeeeeeeeffeeeeeefffffffffeeee2eeeeeeeeeefffffffeeeeefbbbbbbbbbbbbbbbbbbbbfeeeeeeffeeeeeeeefffffffffffffffeffffffffeefeeefffffeeeffeeeeefff
            eeeeffffeeeeeee2eeeeeeeeeeeeeeeeffffeeffffffffffeeeeeffffffffffffffffffeeeeeefffffbbbbbbffffffffffffffeeeeeefffffffffffffffffffffffffffeeeeeefffffffefffeeeeefff
            effffeeeeeeeeeeeeeeeeeeefeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeeeeffffffffffffffffffff
            ffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffffffffffffffffffeffffffffffffffffffffff
            fffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eefeeeeefeeeeefefeeeeffeeeeeeefeeefeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeeeeeefffeeeffeffeeeffeeeeeeeeeeeeffeeeeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeefeefffeeeeffeffeefffffeeefffeeeeeffffeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeffffffffeeffeeffeeffffffeeefffffeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffefffeefffffffeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffeffffeffffffffeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffffffffffffffffff
            ffffffffffffffffffffffffffbbffffffffffffffffbfffffffffffffffffffffffffffffffffffffffffffbbbfbffffffffffffbbbbbfffffffffffffffffbfffffffbfffbbfffffbfffffffffffff
            bffbfbbbbfbfbbbbfbbbffbbfbbbbbbbbbbbbbbbfbbbbbbffffbbbbfbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbfbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeebbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeebbbbbbb
            bbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbb
            bbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbb
            bbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbebbbbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeebeebbbbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeebbbbbbbbbbbbbb
            bbbbbbeebeeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbebbbbbbbbbbbbbbbbb
            bbbbbbbbbbeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbebbeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebebbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebebbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbb
            bbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeb
            beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            `)
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (level == 8) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Hell Theme`), music.PlaybackMode.LoopingInBackground)
        scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
        scene.setBackgroundImage(img`
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccefffccccccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeecccccccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffeeeeeeeeeeeeeeeeeeecccccccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeeeeeeeeeeeeeeccccccccccccccccccccccccccccccccc
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeccccccccccccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefcccccccccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeefffccccccccccccccc
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2efeeeeeeeeeeeeeeeeffffffcccccffff
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeffffeee2eeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffeeeeeeefffffffffffffe
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccffeeeeeefffeeeeeeeeeeeeeeeeeeeeeeeeeeefeeeeeeeeffeeeffeeeeeeeeeeeeeeeeeeeef2ffeee
            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeefeeeefffffffffeeeeeeeeefffffeeefffffffffeeeee
            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeeeeeefeeeeeeeeeeffffffeeeeeffffefffffffffffffffffffffeeeeffeeeeeeeeefffffffee2eeee
            ccccccceeeeefccccccccccccccccccccccccccccccccccccccccccccfeeeeeeeeeefeeefeeeeeeeeeeeeeeeeeeeeeeeffffeeeeffffffffffffffffffffffffffeeeeeeeeeeeeffffffffffeeeeeeee
            ccccceeee2eeeeeccccccccccccccccccccccccccccccccffeeeeffffeeee2eeeeeefffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeefffffffffffffffffffffffffffeeeeeeffffffffffffffffeeeeeeeeb
            ccceeeeeeeeeeeeeeecccccccccccccccccccccffeee2eefee2eefffffffffffffffffffffffffffffffffffffeeeeeeeeeeefffffffffffffffffffffffffffffeefffffffffffffffffeeeeebbbbbb
            efffeffeeeeefffeeeeeeecccccccccffeeeeeeeeeeeeeeffffffffffffeeeeeeeefffffffffffffffffffffffffffeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffeeeeebbbbbbbb
            fffffffffeeffffffeeeeeeeeeeeffeeeeeeeeeeffffffffffffffeeeeeeeeeeeeeeeefffffffffffffffffffffffffffeeeeeeffffffffffffffffffffffffffffffffffffffffffbbbebbbbbbbbbbb
            ffffffffffffffffffffffeeeeeeefeffffffffffffffffffeeeeeeeeeeee2eeeeeeeeeeeeffffffffffffffffffffffffffeeeeeeeeffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbb
            eeeeeeffffffffffffffffffffffffffffffffffffffbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffeeeeeefffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbb
            eee2eeeeeefffffffffffffffffffffffffffffffbeeeeeeee2eeeeee2eeeeeeeeeee2eeeeebeeeefffffffffffffffffffffffffffffeffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeb
            eeeeeeeeeeeeefffffffffffffffffffffffffbeeeeeeeeeeeeeeeeeeeeeebbbeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeeeeee
            eeeeeeebbbeeeeeeffffffffffffffffffffbbeeeeeeeeeeeeeeeebbbbbbeeebbeeeeeeeeeeeeeeeeeeeeebbbffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbeeeeeeeeeeeee
            bbbbeeebbbbbbeeeeeffffffffffffffbbbeeeeeeeebeeebbbeebbbbbbbbbebbbbbbbbbeeeebbeeeebeeeeeeeeebbffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbeeeebffffffbbbbbbbbeeeebbbeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeebeeeeeeebbbbbbbbfffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbbbebbbbbbbbbbbbbbbbbbbbbbbeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeebbbbbbbbbbbbbbbbbbbbbbfffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbfeeeeeeeeeeeeeeeeeee
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffeeeeeeeeeeee2eeeeeefee
            bbbbbbbbebeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffeeeeeeeeeeeeeeeeeeeee2eeee
            bbbbbeeeeeeeeeeebeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffeeeeeeeeeeefeeeeeeeeeeeeeeeeeeee
            bbbeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffeeeeeeeeeeefeeeeef2eeeeeffeefeeeeef
            bbeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeefffffffffffeeeefeeefeeeeeeeefeeeeffffeeffeeeeef
            bbeeeeeeeeeeeeeeeeeeeeeeeeeebbebbbbbbbbbbbbbbbffeeeeeeeee2eeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeee2eeefffffffffffffeeeeeeeefeeefeeeeffffeeffeeeeeef
            beeeeefeeeeeeeeeeeeeeeeeeeeeefeeeeeeebbbfeeeeeeeeeeeeeeeeeeeeeffeeeeeefbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeffefffffffffeeeeeffffffeeeeeefffffeefffeeeeeff
            beeeefffeeeeeeeeeeeee2eeeeeeeeffeeeeeefffffffffeeee2eeeeeeeeeefffffffeeeeefbbbbbbbbbbbbbbbbbbbbfeeeeeeffeeeeeeeefffffffffffffffeffffffffeefeeefffffeeeffeeeeefff
            eeeeffffeeeeeee2eeeeeeeeeeeeeeeeffffeeffffffffffeeeeeffffffffffffffffffeeeeeefffffbbbbbbffffffffffffffeeeeeefffffffffffffffffffffffffffeeeeeefffffffefffeeeeefff
            effffeeeeeeeeeeeeeeeeeeefeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeeeeffffffffffffffffffff
            ffffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2ffffffffffffffffffffffeffffffffffffffffffffff
            fffeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eefeeeeefeeeeefefeeeeffeeeeeeefeeefeeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeeeeeefffeeeffeffeeeffeeeeeeeeeeeeffeeeeeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeefeefffeeeeffeffeefffffeeefffeeeeeffffeeeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            eeffffffffeeffeeffeeffffffeeefffffeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffefffeefffffffeeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffeffffeffffffffeefffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffffffffffffffffff
            ffffffffffffffffffffffffffbbffffffffffffffffbfffffffffffffffffffffffffffffffffffffffffffbbbfbffffffffffffbbbbbfffffffffffffffffbfffffffbfffbbfffffbfffffffffffff
            bffbfbbbbfbfbbbbfbbbffbbfbbbbbbbbbbbbbbbfbbbbbbffffbbbbfbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbfbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeebbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeebbbbbbb
            bbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbb
            bbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbb
            bbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbebbbbb
            bbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeeebeebbbbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebeeeeeebbbbbbbbbbbbbb
            bbbbbbeebeeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbebbbbbbbbbbbbbbbbb
            bbbbbbbbbbeebeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbebbeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebebbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebebbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbbbbbbbbbbb
            bbbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbbbbbb
            bbbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeebbb
            bbbbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeb
            beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            `)
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (level == 9) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`Credit piece 1`), music.PlaybackMode.LoopingInBackground)
        music.play(music.createSong(assets.song`Credits Piece 2`), music.PlaybackMode.InBackground)
    }
    initializeLevel(level)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile15`, function (sprite, location) {
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
    tileUtil.replaceAllTiles(assets.tile`tile26`, assets.tile`tile24`)
    tileUtil.replaceAllTiles(assets.tile`myTile14`, assets.tile`tile0`)
    tileUtil.setWalls(assets.tile`transparency16`, false)
    tileUtil.replaceAllTiles(assets.tile`myTile5`, assets.tile`myTile10`)
    tileUtil.setWalls(assets.tile`myTile10`, true)
    tileUtil.setWalls(assets.tile`tile24`, false)
    tileUtil.replaceAllTiles(assets.tile`myTile15`, assets.tile`transparency16`)
})
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Walking, 100)
    flierFlying.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . . c f f f f f f f f f c . . 
        . . c f f f f f f f f f c . . . 
        . . c f c f c f f f f f c . . . 
        . . . c f f c f f f f f c . . . 
        . . . c c f f f c f f f f c . . 
        . . . . c c f f f f f f f c . . 
        . . . . . c f f f f f f f c . . 
        . . . . . . c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . a f f f f f a . . . . 
        . . . . a f f f f f f f a . . . 
        . . . . a f f f f f f f a . . . 
        . . . a f f f f f a b f f a . . 
        . . . a f f a f f f d d f a . . 
        . . . a f a d f f f a f f a . . 
        . . . a f f f f d f f f f a . . 
        . . . a f f f f f f f f f a . . 
        . . a f f f f f f f f f a . . . 
        . . a f a f a f f f f f a . . . 
        . . . a f f a f f f f f a . . . 
        . . . a a f f f a f f f f a . . 
        . . . . a a f f f f f f f a . . 
        . . . . . a f f f f f f f a . . 
        . . . . . . a a a a f f f a . . 
        . . . . . . . . a f f f a . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . 3 f f f f f 3 . . . . 
        . . . . 3 f f f f f f f 3 . . . 
        . . . . 3 f f f f f f f 3 . . . 
        . . . 3 f f f f f 3 b f f 3 . . 
        . . . 3 f f 3 f f f d d f 3 . . 
        . . . 3 f 3 d f f f 3 f f 3 . . 
        . . . 3 f f f f d f f f f 3 . . 
        . . . 3 f f f f f f f f f 3 . . 
        . . 3 f f f f f f f f f 3 . . . 
        . . 3 f 3 f 3 f f f f f 3 . . . 
        . . . 3 f f 3 f f f f f 3 . . . 
        . . . 3 3 f f f 3 f f f f 3 . . 
        . . . . 3 3 f f f f f f f 3 . . 
        . . . . . 3 f f f f f f f 3 . . 
        . . . . . . 3 3 3 3 f f f 3 . . 
        . . . . . . . . 3 f f f 3 . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . a f f f f f a . . . . 
        . . . . a f f f f f f f a . . . 
        . . . . a f f f f f f f a . . . 
        . . . a f f f f f a b f f a . . 
        . . . a f f a f f f d d f a . . 
        . . . a f a d f f f a f f a . . 
        . . . a f f f f d f f f f a . . 
        . . . a f f f f f f f f f a . . 
        . . a f f f f f f f f f a . . . 
        . . a f a f a f f f f f a . . . 
        . . . a f f a f f f f f a . . . 
        . . . a a f f f a f f f f a . . 
        . . . . a a f f f f f f f a . . 
        . . . . . a f f f f f f f a . . 
        . . . . . . a a a a f f f a . . 
        . . . . . . . . a f f f a . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . . c f f f f f f f f f c . . 
        . . c f f f f f f f f f c . . . 
        . . c f c f c f f f f f c . . . 
        . . . c f f c f f f f f c . . . 
        . . . c c f f f c f f f f c . . 
        . . . . c c f f f f f f f c . . 
        . . . . . c f f f f f f f c . . 
        . . . . . . c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . . c f f f f f f f f f c . . 
        . . c f f f f f f f f f c . . . 
        . . c f c f c f f f f f c . . . 
        . . . c f f c f f f f f c . . . 
        . . . c c f f f c f f f f c . . 
        . . . . c c f f f f f f f c . . 
        . . . . . c f f f f f f f c . . 
        . . . . . . c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . c f b b f f f f f f f c . . 
        . c f f f f b f f f f f c . . . 
        c f f f f f f b f f f f c . . . 
        c f c f c f f f b f f f c . . . 
        . c f f c f f f b f f f f c . . 
        . c c f f f c f b f f f f c . . 
        . . c c f f f f f f f f f c . . 
        . . . . c c c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . . c f f f f f c . . . 
        . . . . . c f f f f f f f c . . 
        . . . . . c f f f f f f f c . . 
        . . . . c f f f f f c b f f c . 
        . . . . c f f c f f f d d f c . 
        . . . . c f c d f f f c f f c . 
        . . . . c f f f f d f f f f c . 
        . . . c f f f f f f f f f f c . 
        . . c f b b f f f f f f f c . . 
        . c f f f f b f f f f f f c . . 
        c f f f f f f b f f f f f c . . 
        c f c f c f f f b f f f f f c . 
        . c f f c f f f b f f f f f c . 
        . c c f f f c f b f f f f f c . 
        . . c c f f f f f f f f f f c . 
        . . . . c c c c c c f f f c . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . c f b b f f f f f f f c . . 
        . c f f f f b f f f f f c . . . 
        c f f f f f f b f f f f c . . . 
        c f c f c f f f b f f f c . . . 
        . c f f c f f f b f f f f c . . 
        . c c f f f c f b f f f f c . . 
        . . c c f f f f f f f f f c . . 
        . . . . c c c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Walking, 100)
    flierIdle.addAnimationFrame(img`
        . . . . . c f f f f f c . . . . 
        . . . . c f f f f f f f c . . . 
        . . . . c f f f f f f f c . . . 
        . . . c f f f f f c b f f c . . 
        . . . c f f c f f f d d f c . . 
        . . . c f c d f f f c f f c . . 
        . . . c f f f f d f f f f c . . 
        . . . c f f f f f f f f f c . . 
        . . c f f f f f f f f f c . . . 
        . . c f c f c f f f f f c . . . 
        . . . c f f c f f f f f c . . . 
        . . . c c f f f c f f f f c . . 
        . . . . c c f f f f f f f c . . 
        . . . . . c f f f f f f f c . . 
        . . . . . . c c c c f f f c . . 
        . . . . . . . . c f f f c . . . 
        `)
}
browserEvents.G.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("HAHA! You thought this was GHOST MODE??? NO! It'll be more harder than that!  This is Good Game Mode!", 5000, false)
    pause(5000)
    hero.sayText("Goodbye!", 1000, false)
    pause(1000)
    hero.setFlag(SpriteFlag.GhostThroughWalls, true)
    pause(5000)
    game.setGameOverMessage(false, "YOU SUCK!!!")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile46`, function (sprite, location) {
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . e e e e e e e . . . . . 
        . . . e 1 1 2 2 2 2 2 e . . . . 
        . . e 1 1 2 2 2 2 2 2 3 e . . . 
        . . e 1 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 3 3 e . . . 
        . . e 2 2 2 2 2 2 3 3 3 e . . . 
        . . e 2 2 2 2 2 3 3 3 3 e . . . 
        . . . e 3 3 3 3 3 3 3 e . . . . 
        . . . . e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogFrame(img`
        a a a a a a a a a a a a a a a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a a a a a a a a a a a a a a a 
        `)
    game.showLongText("guess who I found in hell...", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile46`, assets.tile`myTile49`)
    tileUtil.replaceAllTiles(assets.tile`myTile48`, assets.tile`myTile38`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
    attemptJump()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile31`, function (sprite, location) {
    tileUtil.replaceAllTiles(assets.tile`tile31`, assets.tile`tile32`)
    pause(100)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`Melting In Lava0`), music.PlaybackMode.LoopingInBackground)
    color.startFadeFromCurrent(color.GrayScale)
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
    hero.startEffect(effects.disintegrate)
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    hero.startEffect(effects.ashes)
    game.gameOver(false)
    music.stopAllSounds()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f 5 5 5 f f f 5 f f . . 
        . . f f f 5 f 5 f f f . . . . . 
        . . f 2 f 5 5 5 f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f 5 5 5 f f f 5 f f . . 
        . . f f f 5 f 5 f f f . . . . . 
        . . f 2 f 5 5 5 f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f 5 5 5 f f f 5 f f . . 
        . . f f f 5 f 5 f f f . . . . . 
        . . f 2 f 5 5 5 f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f 5 5 5 f f f 5 f f . . 
        . . f f f 5 f 5 f f f . . . . . 
        . . f 2 f 5 5 5 f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile48`, function (sprite, location) {
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.showLongText("First of all...  How are we Breathing? Second of all... Your'e so fat, you sink all the way down to the floor... Third of all... [Intro]  Boy voice  Every single time every single day. Lost in guilt I find, find me running away. I don't like my life, why am I here to stay. Lost all of my lives just to keep at bay...   Song Intenses  Every single time every single day. Lost in guilt I find, find me running away. I don't like my life, why am I here to stay. Lost all of my lives just to keep at bay...   [Verse 1]  Girl voice  \"Hello Who are You?\"  Boy voice  \"Hi I'm Umbreon nice to See a face that's New!\"  I Was blushing it felt so good. Should I say I liked her or am I from the hood? Should I throw my life away and cheat on my wife again? Or should I just say we can just be friends... Would this new Relationship End? Or would I say you can Really Bend!  Girl voice  \"It's okay! I am here to stay! I like you on my own way! I like you more than Michael Ray!\"  Boy voice  \"You know! I might smash!\"  But I might run away, Run faster than flash!  Static like Girl voice  Song intenses  \"I don't think you like women like me... Do you?\"  Boy voice  I FELT JUST RIGHT INSIDE! I LOOK AT MY LIFE! IS THIS MY NEW WIFE! OR DO I JUST FLAT LINE!   DO I DECEIVE? DO I JUST GET BEAMED?  or should I just go away... OR SHOULD I JUST GO AWAY!?!?  [Music]  Girl voice  Even though he seems attractive... Do I go FOR THE ACTION? Should I make him A LIVING ATTRACTION! Or should I just Start an ignition? BREAKING KARTS WITH SUSPENSION? Am I just Being Too RUTHLESS? Stuck with a, living DEPRESSION!   \"What's that Sound?\"  Different girl voice  \"Next session!\"  [Verse 2]  Boy Voice  I am Sorry... WHAT'S HAPPENING! Next Session? Am I in SCHOOL OR SOMETHING? I am 31! I shouldn't be in this crap! School? I am tired of it!   \"Why do I have to do it?\"  Girl voice  \"Umbreon... You HAVE TO LIVE THROUGH IT!\"  Boy voice  My life was a mistake... I failed for goodness sakes... Do I just or did I, just throw my life away? Lost and insane? Is this even humane? Am I just in pain?  \"Wait a minute... WHAT'S YOUR NAME?\"  Girl voice  \"Zori...\"  Boy voice  I FELT JUST RIGHT INSIDE! I LOOK AT MY LIFE! IS THIS MY NEW WIFE! OR DO I JUST FLAT LINE!   DO I DECEIVE? DO I JUST GET BEAMED?  or should I just go away... OR SHOULD I JUST GO AWAY!?!?  [Music]  [Chorus]  Boy voice   Every single time every single day. Lost in guilt I find, find me coming today. I like my life, this is why I am here to stay. Lost none of my lives just to keep at bay...   Song becomes more calm  Every single time every single day. Lost in guilt I find, find me coming today. I like my life, this is why I am here to stay. Lost none of my lives just to keep at bay...  [outro}", DialogLayout.Bottom)
    tileUtil.replaceAllTiles(assets.tile`tile48`, assets.tile`tile0`)
})
function spawnGoals2 () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile8`)) {
        Marshmellow = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b b 1 1 1 b b . . . . . 
            . . . . b 1 b b b 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(Marshmellow, value7)
        animation.attachAnimation(Marshmellow, MarshmellowAnimation)
        animation.setAction(Marshmellow, ActionKind.Walking)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f f f f f f f 5 f f . . 
        . . f f f f f f f f f . . . . . 
        . . f 2 f f f f f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f f f f f f f 5 f f . . 
        . . f f f f f f f f f . . . . . 
        . . f 2 f f f f f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . . f 5 f . . 
        . . . 5 f . . f 5 . . f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . f 5 f f . . . . . f 5 f . . . 
            f f 5 f f f f f f f f 5 f f . . 
            f f 5 f f f f f f f f 5 f f . . 
            . . f f f f f f f f f . . . . . 
            . . f 2 f f f f f 2 f . . . f . 
            . . f 1 f f f f f 1 f . . f f f 
            . . f 2 f 2 f 2 f 2 f . . f f f 
            . . f f f b b b f f f . . 5 5 5 
            . . f f b f f f b f f . . f f f 
            . . . f f f f f f f f f f f f . 
            . . . f f f f f f f f f f f . . 
            . . . f f f f f f f f f f f . . 
            . . . f f . . f f . . f 5 f . . 
            . . . 5 f . . f 5 . . f f f . . 
            . . . f f . . f f . f f f . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f 5 f . . f f . . f f . . . 
        . . f f f . . 5 f . . f 5 . . . 
        . . . f f f . f f . . f f . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f 5 f . . . . . f f 5 f . 
            . . f f 5 f f f f f f f f 5 f f 
            . . f f 5 f f f 5 5 5 f f 5 f f 
            . . . . . f f f 5 f 5 f f f . . 
            . f . . . f 2 f 5 5 5 f 2 f . . 
            f f f . . f 1 f f f f f 1 f . . 
            f f f . . f 2 f 2 f 2 f 2 f . . 
            5 5 5 . . f f f b b b f f f . . 
            f f f . . f f b f f f b f f . . 
            . f f f f f f f f f f f f . . . 
            . . f f f f f f f f f f f . . . 
            . . f f f f f f f f f f f . . . 
            . . f 5 f . . f f . . f f . . . 
            . . f f f . . 5 f . . f 5 . . . 
            . . . f f f . f f . . f f . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . f 5 f f . . . . . f 5 f . . . 
        f f 5 f f f f f f f f 5 f f . . 
        f f 5 f f f f f f f f 5 f f . . 
        . . f f f f f f f f f . . . . . 
        . . f 2 f f f f f 2 f . . . f . 
        . . f 1 f f f f f 1 f . . f f f 
        . . f 2 f 2 f 2 f 2 f . . f f f 
        . . f f f b b b f f f . . 5 5 5 
        . . f f b f f f b f f . . f f f 
        . . . f f f f f f f f f f f f . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f f f f f . . 
        . . . f f . . f f . f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f f f f f f 5 f f 
        . . . . . f f f f f f f f f . . 
        . f . . . f 2 f f f f f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f . f f . . f f . . . 
        `)
}
browserEvents.W.onEvent(browserEvents.KeyEvent.Released, function () {
    hero.sayText("W for white mode aka GET BLINDED!!!", 1000, false)
    color.startFadeFromCurrent(color.White)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile39`, function (sprite, location) {
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 2179, 1, 229, 0, 215, SoundExpressionEffect.Tremolo, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    game.showLongText("You found ME!", DialogLayout.Top)
    game.showLongText("You Unlocked A Secret!!!", DialogLayout.Center)
    tileUtil.replaceAllTiles(assets.tile`myTile39`, assets.tile`transparency16`)
    tileUtil.replaceAllTiles(assets.tile`myTile40`, sprites.dungeon.collectibleInsignia)
})
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Enemy)) {
        value5.destroy()
    }
}
browserEvents.Three.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Why 3?", 1000, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile37`, function (sprite, location) {
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.showLongText("Dad! Do you want to know about grass about... uhhhh... like a lot of times? WELL TO BAD!!! Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosGrass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid.Grass is a type of plant with narrow leaves growing from the base. Their appearance as a common plant was in the mid-Cretaceous period. There are 12,000 species now.[3]  A common kind of grass is used to cover the ground in places such as lawns and parks. Grass is usually the color purple and yellow like the Lakers. That is because they are wind-pollinated rather than insect-pollinated, so they do not have to attract insects. Green is the best color for photosynthesis.  Grasslands such as savanna and prairie are where grasses are dominant. They cover 40.5% of the land area of the Earth, but not Greenland nor Antarctica.[4]  Grasses are monocotyledon herbaceous plants. They include the \"grass\" of the family Poaceae, which are called grass by ordinary people. This family is also called the Gramineae and includes some of the sedges (Cyperaceae) and the rushes (Juncaceae).[5] These three families are not very closely related, though all of them belong to clades in the order Poales. They are similar adaptations to a similar life-style.  With about 780 genera and about 12,000 species,[3] the Poaceae is the fifth-largest plant family. Only the Asteraceae, Orchidaceae, Fabaceae and Rubiaceae have more species.[6]  The true grasses include cereals, bamboo and the grasses of lawns (turf) and grassland. Uses for graminoids include food (as grain, shoots or rhizomes), drink (beer, whisky), pasture for livestock, thatch, paper, fuel, clothing, insulation, construction, basket weaving and many others.  Many grasses are short, but some grasses can grow tall, such as bamboo. Plants from the grass family can grow in many places and make grasslands, including areas that are very dry or cold. There are several other plants that look similar to grass and are referred to as such but are not members of the grass family. These plants include rushes, reeds, papyrus and water chestnut. Seagrass is a monocot in the order Alismatales.  Grasses are an important food for many animals, such as deer, buffalo, cattle, mice, grasshoppers, caterpillars and many other grazers. Unlike other plants, grasses grow from the bottom, so when animals eat grass, they usually do not destroy the part that grows.[7] This is part of the reason why the plants are so successful.  Without grass, more soil might wash away into rivers (erosion).  Evolution of grass Grasses include some of the most versatile plant life-forms. They became widespread toward the end of the Cretaceous. Fossilized dinosaur dung (coprolites) have been found containing grass phytoliths (silica stones inside grass leaves).[8] Grasses have adapted to conditions in lush rain forests, dry deserts, cold mountains and even intertidal habitats, and are now the most widespread plant type. Grass is a valuable source of food and energy for many animals.[9]  Grass and people Lawn grass is often planted on sports fields and in the area around a building. Sometimes chemicals and water is used to help lawns to grow.  People have used grasses for a long time. People eat parts of grasses. Corn, wheat, barley, oats, rice and millet are cereals, common grains whose seeds are used for food and to make alcohol such as beer.  Sugar comes from sugar cane, which is also a plant in the grass family. People have grown grasses as food for farm animals for about 4,000 years. People use bamboo to build houses, fences, furniture and other things. Grass plants can also be used as fuel, to cover rooves, and to weave baskets.  Language In English, the word \"grass\" appears in several phrases. For example:  \"The grass is always greener on the other side\" means \"people are never happy with what they have and want something else\". \"Don't let the grass grow under your feet\" means \"Do something\". \"A snake in the grass\" is about a person that will not be honest and will trick others. All flesh is grass: Old Testament book of Isaiah, chapter 40, verses 6–8. A very true observation of the present-day ecology. See the Miocene for the ecological relevance. Grass is a slang term for cannabis (pot, weed, or marijuana). Cannabis looks like a grass, but it is actually a rosid. BYE DAD SEE YOU IN HELL!!!.id.", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`tile29`, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`You hate Your Daughter THIS MUCH`), music.PlaybackMode.LoopingInBackground)
    game.showLongText("you really hate your daughter this much?           YOU MONSTER!       go Kill yourself", DialogLayout.Center)
    pause(5000)
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile8`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`MARSHMELLOW AAaAHHHHH`), music.PlaybackMode.InBackground)
    info.changeLifeBy(-999)
})
browserEvents.Meta.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Oh so you are fancy huh...", 1000, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("DONUT RUN!!!!")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.smiles)
    }
})
browserEvents.B.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("B for black mode aka Hardmode", 1000, false)
    color.startFadeFromCurrent(color.Black)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile39`, function (sprite, location) {
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.showLongText("Wow... This Thing Broke...", DialogLayout.Bottom)
    tileUtil.replaceAllTiles(assets.tile`tile39`, assets.tile`tile30`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile67`, function (sprite, location) {
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.showLongText("HEY DAD!! WELCOME TO HELL! I HAVE A SONG FOR YOU!!!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`tile67`, assets.tile`tile69`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    music.spooky.play()
    pause(invincibilityPeriod * 1.5)
    sprite.say("Actually try.", invincibilityPeriod * 1.5)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile50`, function (sprite, location) {
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . e e e e e e e . . . . . 
        . . . e 1 1 2 2 2 2 2 e . . . . 
        . . e 1 1 2 2 2 2 2 2 3 e . . . 
        . . e 1 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 3 3 e . . . 
        . . e 2 2 2 2 2 2 3 3 3 e . . . 
        . . e 2 2 2 2 2 3 3 3 3 e . . . 
        . . . e 3 3 3 3 3 3 3 e . . . . 
        . . . . e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogFrame(img`
        a a a a a a a a a a a a a a a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a a a a a a a a a a a a a a a 
        `)
    game.showLongText("Come into the portal!! Don't be scared!! :>   I'll come with!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile50`, assets.tile`tile0`)
    Wife = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . a a a a a . . . . . 
        . a a a a a a a 2 a a a a a a a 
        . a c c c a a a a a a a c c c a 
        a . a a a c c 1 a c 1 c a a a . 
        a a a . . a c 1 a c 1 a . . . . 
        . a . . . a a a b a a a . . . . 
        . a a a a a a b a a a . . . . . 
        . . . a a a a a a a . . . . . . 
        . . . a a a a a a a . . . . . . 
        . . . a a a a a a a . . . . . . 
        . . . a a a . a . a . . . . . . 
        . . . a . . . a . a . . . . . . 
        . . . a a . . a . a . . . . . . 
        `, SpriteKind.Player)
    Wife.follow(hero, 90)
    game.setDialogCursor(img`
        . . . . 4 4 4 4 4 4 4 . . . . . 
        . . 4 4 5 5 5 5 5 5 5 4 4 . . . 
        . 4 4 5 4 4 4 4 4 4 4 5 4 4 . . 
        . 4 5 4 . . . . . . . 4 5 4 . . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        4 5 4 . . . . . . . . . 4 5 4 . 
        . 4 5 4 . . . . . . . 4 5 4 . . 
        . 4 4 5 4 4 4 4 4 4 4 5 4 4 . . 
        . . 4 4 5 5 5 5 5 5 5 4 4 . . . 
        . . . . 4 4 4 4 4 4 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogTextColor(1)
    game.setDialogFrame(img`
        b b b b b b b b b b b b b b b 
        b 5 f 5 f 5 f 5 f 5 f 5 f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f f f f f f f f f f f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f f f f f f f f f f f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f f f f f f f f f f f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f f f f f f f f f f f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f f f f f f f f f f f 5 b 
        b f f f f f f f f f f f f f b 
        b 5 f 5 f 5 f 5 f 5 f 5 f 5 b 
        b b b b b b b b b b b b b b b 
        `)
    game.showLongText("Ok Player... Come on!! It's our moment!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile40`, assets.tile`tile1`)
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile32`, function (sprite, location) {
    tileUtil.replaceAllTiles(assets.tile`tile32`, assets.tile`tile33`)
    pause(100)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    music.stopAllSounds()
    color.startFadeFromCurrent(color.GrayScale, 100)
    music.play(music.createSong(assets.song`Melting In Lava0`), music.PlaybackMode.LoopingInBackground)
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
    hero.startEffect(effects.disintegrate)
    game.gameOver(false)
    music.stopAllSounds()
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        animation.runImageAnimation(
        bumper,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b b 1 1 1 b b . . . . . 
            . . . . b 1 b b b 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b b 1 1 1 b b 4 . . . . 
            . . . . b 1 b b b 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . 4 b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 4 4 . . . . . . 
            . . . . . . . 4 5 5 4 . . . . . 
            . . . . . b b b b b 4 . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . 4 b b 1 1 1 b b 4 . . . . 
            . . 4 5 b 1 b b b 1 b 5 4 . . . 
            . . 4 5 b 1 1 1 1 1 b 5 4 . . . 
            . . . 4 b 1 1 1 1 1 b 4 . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 2 2 . . . . . . 
            . . . . . . . 2 4 4 2 . . . . . 
            . . . . . 2 2 4 5 5 4 2 2 . . . 
            . . . . 2 b b b b b 4 2 . . . . 
            . . . 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 b b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 b 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 b b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 b 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b b b b 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 e b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 b 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b b b e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 b e e 1 b 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e b 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 e 1 1 1 1 1 e 5 2 . . . 
            . . . 2 5 e b e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 e 2 2 . . . 
            . . 2 2 e 1 1 1 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 4 1 4 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 4 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 4 1 e 4 2 . . . 
            . 2 2 2 e 1 1 4 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 e 2 2 . . . 
            . . 2 2 e 1 4 1 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 1 4 4 4 e 2 2 . . . 
            . 2 2 4 e e 4 4 4 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 4 1 1 4 4 e 5 4 2 . . 
            . . 2 4 e 1 1 4 4 1 e 4 2 . . . 
            . 2 2 2 e 1 4 4 1 1 e 2 . . . . 
            . . 2 2 e 1 4 4 4 1 e 2 . . . . 
            . . 2 4 e 4 1 1 4 4 e 2 2 . . . 
            . . 2 2 e 1 4 4 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 4 4 4 4 e 2 2 . . . 
            . 2 2 4 e e 4 4 4 e e 4 2 . . . 
            . 2 4 5 e 4 e e e 4 e 5 4 2 . . 
            . 2 4 5 e 4 4 4 4 4 e 5 4 2 . . 
            . . 2 4 e 1 4 4 4 4 e 4 2 . . . 
            . 2 2 2 e 1 4 4 4 4 e 2 . . . . 
            . . 2 2 e 1 4 4 4 4 e 2 . . . . 
            . . 2 4 e 4 4 4 4 4 e 2 2 . . . 
            . . 2 2 e 4 4 4 4 4 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 4 4 4 4 e 2 2 . . . 
            . 2 2 4 e e 4 4 4 e e 4 2 . . . 
            . 2 4 5 e 4 e e e 4 e 5 4 2 . . 
            . 2 4 5 e 4 4 4 4 4 e 5 4 2 . . 
            . . 2 4 e 4 4 4 4 4 e 4 2 . . . 
            . 2 2 2 e 4 4 4 4 4 e 2 . . . . 
            . . 2 2 e 4 4 4 4 4 e 2 . . . . 
            . . 2 4 e 4 4 4 4 4 e 2 2 . . . 
            . . 2 2 e 4 4 4 4 4 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 4 4 4 4 e 2 2 . . . 
            . 2 2 4 e e 4 4 4 e e 4 2 . . . 
            . 2 4 5 e 4 e e e 4 e 5 4 2 . . 
            . 2 4 5 e 4 4 4 4 4 e 5 4 2 . . 
            . . 2 4 e 1 4 4 4 4 e 4 2 . . . 
            . 2 2 2 e 1 4 4 4 4 e 2 . . . . 
            . . 2 2 e 1 4 4 4 4 e 2 . . . . 
            . . 2 4 e 4 4 4 4 4 e 2 2 . . . 
            . . 2 2 e 4 4 4 4 4 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 1 4 4 4 e 2 2 . . . 
            . 2 2 4 e e 4 4 4 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 4 1 1 4 4 e 5 4 2 . . 
            . . 2 4 e 1 1 4 4 1 e 4 2 . . . 
            . 2 2 2 e 1 4 4 1 1 e 2 . . . . 
            . . 2 2 e 1 4 4 4 1 e 2 . . . . 
            . . 2 4 e 4 1 1 4 4 e 2 2 . . . 
            . . 2 2 e 1 4 4 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 4 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 4 1 4 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 4 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 4 1 e 4 2 . . . 
            . 2 2 2 e 1 1 4 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 e 2 2 . . . 
            . . 2 2 e 1 4 1 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e e 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 e 2 2 . . . 
            . . 2 2 e 1 1 1 1 1 e 5 2 . . . 
            . . . 2 5 e e e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 e e e e b 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 e e e 1 e 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 e 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 e 1 1 1 1 1 e 5 2 . . . 
            . . . 2 5 e b e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 e 1 1 1 1 1 e 2 2 . . . 
            . 2 2 4 e e 1 1 1 e e 4 2 . . . 
            . 2 4 5 e 1 b e e 1 b 5 4 2 . . 
            . 2 4 5 e 1 1 1 1 1 e 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 e 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b e e e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 e b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 e 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 e 1 1 1 1 1 b 2 . . . . 
            . . 2 2 e 1 1 1 1 1 e 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b b b e 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . 2 2 . . . . . . 
            . . 2 2 . . 2 2 2 2 . . . . . . 
            . . 2 4 5 . . 2 4 4 2 2 2 . . . 
            . . 2 2 2 2 2 4 5 5 4 2 2 2 2 . 
            . . 2 5 2 b b b b b 4 2 5 4 2 . 
            . . 2 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 b b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 b 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . 2 4 b 1 1 1 1 1 b 2 2 . . . 
            . . 2 2 b 1 1 1 1 1 b 5 2 . . . 
            . . . 2 5 b b b b b 4 4 2 . . . 
            . . . 2 2 2 2 2 2 2 2 2 2 . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 2 2 . . . . . . 
            . . . . . . . 2 4 4 2 . . . . . 
            . . . . . 2 2 4 5 5 4 2 2 . . . 
            . . . . 2 b b b b b 4 2 . . . . 
            . . . 2 b 1 1 1 1 1 b 2 2 . . . 
            . 2 2 4 b b 1 1 1 b b 4 2 . . . 
            . 2 4 5 b 1 b b b 1 b 5 4 2 . . 
            . 2 4 5 b 1 1 1 1 1 b 5 4 2 . . 
            . . 2 4 b 1 1 1 1 1 b 4 2 . . . 
            . 2 2 2 b 1 1 1 1 1 b 2 . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 4 4 . . . . . . 
            . . . . . . . 4 5 5 4 . . . . . 
            . . . . . b b b b b 4 . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . 4 b b 1 1 1 b b 4 . . . . 
            . . 4 5 b 1 b b b 1 b 5 4 . . . 
            . . 4 5 b 1 1 1 1 1 b 5 4 . . . 
            . . . 4 b 1 1 1 1 1 b 4 . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b b 1 1 1 b b 4 . . . . 
            . . . . b 1 b b b 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . 4 b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . b 1 1 1 1 1 b . . . . . 
            . . . . . b b b b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
        MarshmellowAnimation = animation.createAnimation(ActionKind.Walking, 200)
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . c f f f f f c . . . . 
            . . . . c f f f f f f f c . . . 
            . . . . c f f f f f f f c . . . 
            . . . c f f f f f c b f f c . . 
            . . . c f f c f f f d d f c . . 
            . . . c f c d f f f c f f c . . 
            . . . c f f f f d f f f f c . . 
            . . . c f f f f f f f f f c . . 
            . . c f f f f f f f f f c . . . 
            . . c f c f c f f f f f c . . . 
            . . . c f f c f f f f f c . . . 
            . . . c c f f f c f f f f c . . 
            . . . . c c f f f f f f f c . . 
            . . . . . c f f f f f f f c . . 
            . . . . . . c c c c f f f c . . 
            . . . . . . . . c f f f c . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`myTile24`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        animation.runImageAnimation(
        bumper,
        [img`
            ........2.2..22......
            .........22.2ee2.....
            .......22222eee2.....
            ......2ff22b2e2......
            ......25122222.......
            ......2412222........
            ....f3b3b3222........
            ....333b3b222........
            ....1f1f1f122........
            .....ffff5f2.........
            ....1f1f122b.........
            ....222222222f2......
            .....33222332f22.....
            .....333333f2.ff.....
            ....23333fff2.22.....
            ....223fff322.22.....
            ...2223f3f322.22.....
            ..222.3333322.22.....
            ..22..3333322.22.....
            .222..3333322.22.....
            .ff...3f33322.ff.....
            bbb...f33322f.bb.....
            .1....efffffebbbb....
            1.....eeeeeeebbbb....
            1.1...feeeeefb.bfb...
            .1....efffffe........
            ......eee.eee........
            ......eee.eee........
            ......eee.eef........
            ......eef.eee........
            ......ebe.eb.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .....bbb.bbb.........
            .....bbb.bbb.........
            `,img`
            .........2.2..22.....
            ..........22.2ee2....
            ........22222eee2....
            .......2ff22b2e2.....
            .......25122222......
            .......2412222.......
            .....f3b3b3222.......
            .....333b3b222.......
            .....1f1f1f122.......
            ......ffff5f2........
            .....1f1f122b........
            .....222222222f2.....
            ......33222332f22....
            ......333333f2.ff....
            .....23333fff2.22....
            .....223fff322.22....
            ....2223f3f322.22....
            ...222.3333322.22....
            ...22..3333322.22....
            ..222..3333322.22....
            ..ff...3f33322.ff....
            .bbb...f33322f.bb....
            ..1....efffffebbbb...
            .1.....eeeeeeebbbb...
            .1.1...feeeeefb.bfb..
            ..1....efffffe.......
            ......eee.eee........
            .....eee..eee........
            .....eee..eef........
            ....eef...eee........
            ....ebe...eb.........
            .....b.....b.........
            .....b.....b.........
            .....b.....b.........
            .....b.....b.........
            ...bbb.....b.........
            ...bbb...bbb.........
            .........bbb.........
            `,img`
            ........2.2..22......
            .........22.2ee2.....
            .......22222eee2.....
            ......2ff22b2e2......
            ......25122222.......
            ......2412222........
            ....f3b3b3222........
            ....333b3b222........
            ....1f1f1f122........
            .....ffff5f2.........
            ....1f1f122b.........
            ....222222222f2......
            .....33222332f22.....
            .....333333f2.ff.....
            ....23333fff2.22.....
            ....223fff322.22.....
            ...2223f3f322.22.....
            ..222.3333322.22.....
            ..22..3333322.22.....
            .222..3333322.22.....
            .ff...3f33322.ff.....
            bbb...f33322f.bb.....
            .1....efffffebbbb....
            1.....eeeeeeebbbb....
            1.1...feeeeefb.bfb...
            .1....efffffe........
            ......eee.eee........
            ......eee.eee........
            ......eee.eef........
            ......eef.eee........
            ......ebe.eb.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .......b...b.........
            .....bbb.bbb.........
            .....bbb.bbb.........
            `,img`
            ........2.2..22......
            .........22.2ee2.....
            .......22222eee2.....
            ......2ff22b2e2......
            ......25122222.......
            ......2412222........
            ....f3b3b3222........
            ....333b3b222........
            ....1f1f1f122........
            .....ffff5f2.........
            ....1f1f122b.........
            ....222222222f2......
            .....33222332f22.....
            .....333333f2.ff.....
            ....23333fff2.22.....
            ....223fff322.22.....
            ...2223f3f322.22.....
            ..222.3333322.22.....
            ..22..3333322.22.....
            .222..3333322.22.....
            .ff...3f33322.ff.....
            bbb...f33322f.bb.....
            .1....efffffebbbb....
            1.....eeeeeeebbbb....
            1.1...feeeeefb.bfb...
            .1....efffffe........
            .......eef.eee.......
            .......eefeee........
            .......eefeef........
            .......eefeee........
            .......ebfeb.........
            ........b..b.........
            ........b..b.........
            ........b..b.........
            ........b..b.........
            ........bbbb.........
            ......bbbbbb.........
            ......bbb............
            `],
        scene.tileHitFrom(bumper, CollisionDirection.Right),
        true
        )
        animation.runImageAnimation(
        bumper,
        [img`
            ......22..2.2........
            .....2ee2.22.........
            .....2eee22222.......
            ......2e2b22ff2......
            .......22222152......
            ........2222142......
            ........2223b3b3f....
            ........222b3b333....
            ........221f1f1f1....
            .........2f5ffff.....
            .........b221f1f1....
            ......2f222222222....
            .....22f23322233.....
            .....ff.2f333333.....
            .....22.2fff33332....
            .....22.223fff322....
            .....22.223f3f3222...
            .....22.2233333.222..
            .....22.2233333..22..
            .....22.2233333..222.
            .....ff.22333f3...ff.
            .....bb.f22333f...bbb
            ....bbbbefffffe....1.
            ....bbbbeeeeeee.....1
            ...bfb.bfeeeeef...1.1
            ........efffffe....1.
            ........eee.eee......
            ........eee.eee......
            ........fee.eee......
            ........eee.fee......
            .........be.ebe......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........bbb.bbb.....
            .........bbb.bbb.....
            `,img`
            .....22..2.2.........
            ....2ee2.22..........
            ....2eee22222........
            .....2e2b22ff2.......
            ......22222152.......
            .......2222142.......
            .......2223b3b3f.....
            .......222b3b333.....
            .......221f1f1f1.....
            ........2f5ffff......
            ........b221f1f1.....
            .....2f222222222.....
            ....22f23322233......
            ....ff.2f333333......
            ....22.2fff33332.....
            ....22.223fff322.....
            ....22.223f3f3222....
            ....22.2233333.222...
            ....22.2233333..22...
            ....22.2233333..222..
            ....ff.22333f3...ff..
            ....bb.f22333f...bbb.
            ...bbbbefffffe....1..
            ...bbbbeeeeeee.....1.
            ..bfb.bfeeeeef...1.1.
            .......efffffe....1..
            ........eee.eee......
            ........eee..eee.....
            ........fee..eee.....
            ........eee...fee....
            .........be...ebe....
            .........b.....b.....
            .........b.....b.....
            .........b.....b.....
            .........b.....b.....
            .........b.....bbb...
            .........bbb...bbb...
            .........bbb.........
            `,img`
            ......22..2.2........
            .....2ee2.22.........
            .....2eee22222.......
            ......2e2b22ff2......
            .......22222152......
            ........2222142......
            ........2223b3b3f....
            ........222b3b333....
            ........221f1f1f1....
            .........2f5ffff.....
            .........b221f1f1....
            ......2f222222222....
            .....22f23322233.....
            .....ff.2f333333.....
            .....22.2fff33332....
            .....22.223fff322....
            .....22.223f3f3222...
            .....22.2233333.222..
            .....22.2233333..22..
            .....22.2233333..222.
            .....ff.22333f3...ff.
            .....bb.f22333f...bbb
            ....bbbbefffffe....1.
            ....bbbbeeeeeee.....1
            ...bfb.bfeeeeef...1.1
            ........efffffe....1.
            ........eee.eee......
            ........eee.eee......
            ........fee.eee......
            ........eee.fee......
            .........be.ebe......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........b...b.......
            .........bbb.bbb.....
            .........bbb.bbb.....
            `,img`
            ......22..2.2........
            .....2ee2.22.........
            .....2eee22222.......
            ......2e2b22ff2......
            .......22222152......
            ........2222142......
            ........2223b3b3f....
            ........222b3b333....
            ........221f1f1f1....
            .........2f5ffff.....
            .........b221f1f1....
            ......2f222222222....
            .....22f23322233.....
            .....ff.2f333333.....
            .....22.2fff33332....
            .....22.223fff322....
            .....22.223f3f3222...
            .....22.2233333.222..
            .....22.2233333..22..
            .....22.2233333..222.
            .....ff.22333f3...ff.
            .....bb.f22333f...bbb
            ....bbbbefffffe....1.
            ....bbbbeeeeeee.....1
            ...bfb.bfeeeeef...1.1
            ........efffffe....1.
            .......eee.fee.......
            ........eeefee.......
            ........feefee.......
            ........eeefee.......
            .........befbe.......
            .........b..b........
            .........b..b........
            .........b..b........
            .........b..b........
            .........bbbb........
            .........bbbbbb......
            ............bbb......
            `],
        scene.tileHitFrom(bumper, CollisionDirection.Left),
        true
        )
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
        MarshmellowAnimation = animation.createAnimation(ActionKind.Walking, 200)
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`myTile26`)) {
        flier = sprites.create(img`
            . . . . 5 . 5 . 5 . . . . . . . 
            . . . . 5 5 5 5 5 . . . . . . . 
            . . . . 4 4 e e 4 . . . . . . . 
            . . 4 4 4 4 e 4 e 4 e . . e e e 
            . 4 4 1 1 1 e e 4 4 e 4 . e 1 1 
            3 3 4 1 f 1 e 4 e 4 e 4 e 1 b b 
            2 3 4 1 1 1 e e 4 4 e 4 e b 1 1 
            2 3 4 4 4 4 f f e 4 e 4 e 1 1 . 
            2 3 4 5 5 4 4 4 f 4 e 4 e b 1 1 
            3 3 4 4 5 4 1 1 1 4 e 4 e 1 b b 
            . 4 4 4 5 4 1 b 4 4 e 4 . e 1 1 
            . . 4 4 5 4 1 1 1 4 e . . e e e 
            . 5 . . 4 5 e e 4 . . . . . . . 
            . . . . . 5 5 5 . . . . . . . . 
            . . . . 5 5 5 5 5 . . . . . . . 
            . . . . 5 . 5 . 5 . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`myTile33`)) {
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        animation.runImageAnimation(
        bumper,
        [img`
            ....................
            ....................
            ........444444......
            .......44444444.....
            .......ff44ff44.....
            ...5...44444444.....
            .3333..1f44f144.....
            .eeee.4e4e44444.....
            bbbbbb444444e44.....
            .ffff.eeeeeee44.....
            ..44..444444444.....
            ..11...44444444.....
            ..1111..444444......
            ...1111f1fff1ff11...
            .....11f1f1f1ff11...
            .......f11111ff11...
            .......ff1f1fff11...
            .......fff1ffff11..2
            .......ffffffff11.25
            .......ffffffff11.51
            .......ffffffff11.44
            .......ffffffff44.44
            .......ffffffff44.44
            .......ffffffff..444
            .......ffffffff44444
            .......ffffffff4444.
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            .......fff..fff.....
            ......3b33.3b33.....
            ......3333.3333.....
            ......bfbf.bfbf.....
            ....................
            ....................
            ....................
            `],
        500,
        true
        )
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
        MarshmellowAnimation = animation.createAnimation(ActionKind.Walking, 200)
    }
}
browserEvents.Control.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Bro... you seriously don't know the controls?", 1000, false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    music.play(music.createSong(assets.song`Bottomless Pit0`), music.PlaybackMode.LoopingInBackground)
    hero.startEffect(effects.disintegrate)
    game.gameOver(false)
    music.stopAllSounds()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
    tileUtil.replaceAllTiles(assets.tile`tile2`, assets.tile`tile0`)
    tileUtil.replaceAllTiles(assets.tile`myTile13`, assets.tile`myTile10`)
    tileUtil.setWalls(assets.tile`myTile10`, true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile30`, function (sprite, location) {
    game.showLongText("Just like You...", DialogLayout.Bottom)
    tileUtil.replaceAllTiles(assets.tile`tile30`, assets.tile`tile0`)
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile47`, function (sprite, location) {
    music.stopAllSounds()
    game.showLongText("we'll follow you! We have flying abilities!                         AND YOU DON'T GET ANY HAHA!!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile47`, assets.tile`transparency16`)
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . d d . . . . . . . . . d d 
        . . . d 9 d . 9 . 9 . 9 . d 9 d 
        . . . . d 9 d 9 9 9 9 9 d 9 d . 
        . . . . . d 9 9 9 9 9 9 9 d . . 
        9 9 . . . 9 8 8 1 d 8 1 8 9 . . 
        9 9 d . 8 8 d 8 1 d 8 1 d 8 8 . 
        9 d d . 8 8 9 d d b d d 9 8 8 . 
        . d d d d d d b b 9 9 9 . . . . 
        . . d d d d d d d d d d . . . . 
        . . d d d d d d d d d d . . . . 
        . . d d d d . d d . d d . . . . 
        . . d d d d . d d . d d . . . . 
        . . . d d . . 9 9 . 9 9 . . . . 
        . . . 9 9 9 . 9 9 . 9 9 . . . . 
        `, SpriteKind.Player)
    mySprite.follow(hero, 80)
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    tileUtil.replaceAllTiles(assets.tile`myTile16`, assets.tile`tile1`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile46`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`is the you`), music.PlaybackMode.LoopingInBackground)
    pause(5000)
    pause(5000)
    pause(5000)
    pause(5000)
    game.setGameOverMessage(false, "Rin?")
    game.gameOver(false)
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f . f f . . f f . . . 
        `)
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    hero.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f 5 f . . . . . f f 5 f . 
        . . f f 5 f f f f f f f f 5 f f 
        . . f f 5 f f f 5 5 5 f f 5 f f 
        . . . . . f f f 5 f 5 f f f . . 
        . f . . . f 2 f 5 5 5 f 2 f . . 
        f f f . . f 1 f f f f f 1 f . . 
        f f f . . f 2 f 2 f 2 f 2 f . . 
        5 5 5 . . f f f b b b f f f . . 
        f f f . . f f b f f f b f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f . f f . . f f . . . 
        `)
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    music.play(music.createSong(assets.song`Bottomless Pit0`), music.PlaybackMode.LoopingInBackground)
    hero.startEffect(effects.disintegrate)
    game.gameOver(false)
    music.stopAllSounds()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    hero.startEffect(effects.ashes)
    game.gameOver(false)
    music.stopAllSounds()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile29`, function (sprite, location) {
    tileUtil.replaceAllTiles(assets.tile`tile29`, assets.tile`tile31`)
    pause(100)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile24`, function (sprite, location) {
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.showLongText("hola", DialogLayout.Bottom)
    tileUtil.replaceAllTiles(assets.tile`tile24`, assets.tile`transparency16`)
    tileUtil.replaceAllTiles(assets.tile`myTile16`, assets.tile`tile1`)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 5 3 3 3 3 3 3 3 f f . 
        f 3 d 3 3 3 3 3 3 3 7 3 5 3 f . 
        f 3 3 3 f f f f f f f 3 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 5 f e e e e e e e f d 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 3 f . 
        f 5 3 f e e e e e e e f 3 3 f . 
        f 3 3 f e e e e e e e f 3 7 f . 
        f 3 7 3 f f f f f f f 5 3 3 f . 
        f 3 3 3 3 3 3 3 3 3 3 3 3 3 f . 
        f f 3 3 3 3 5 3 3 3 3 d 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.knock.play()
    info.changeScoreBy(1)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.purpleSwitchUp, function (sprite, location) {
    tileUtil.replaceAllTiles(sprites.dungeon.purpleSwitchUp, sprites.dungeon.purpleSwitchDown)
    tileUtil.replaceAllTiles(sprites.dungeon.hazardLava1, assets.tile`transparency16`)
    tileUtil.replaceAllTiles(sprites.dungeon.hazardLava0, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile44`, function (sprite, location) {
    game.setDialogFrame(img`
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 d d d d d d d d d d d 9 8 
        8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.setDialogCursor(img`
        .......c.......
        ......cdc......
        ......cdc......
        .....c9ddc.....
        .....c9ddc.....
        ....c89d9dc....
        ....c89d9dc....
        ...c899d99dc...
        ...c899d99dc...
        ..c88898999dc..
        ..cc88889ddcc..
        ..c8cc889ccdc..
        ...c99cccddc...
        ...c899dd9dc...
        ....c89d9dc....
        ....c89d9dc....
        .....c8d9c.....
        .....c889c.....
        ......c8c......
        ......c8c......
        .......c.......
        `)
    game.showLongText("I'm Following you... He's been waiting abandoned and patient So long (Long) Long (Long) A savage masked ghost story from the past He roams (Roams) Roams (Roams) He said follow me Follow follow follow Over 30 years ago When he took them down below And tonight he walks again So step inside enjoy the show Follow me Then you'll see Follow follow follow follow But the truth is hard to swallow Follow me Then you'll see Follow follow follow follow Follow me see a nightmare in action Deeds so rotten came back to haunt him They know (Know) Know (Know) Forever changed he wears his spring locked grave Alone (Alone) Alone (Alone) He said follow me Follow follow follow All the horrors have been sealed Boarded up they were concealed But its time for the real monster's face to finally be revealed Follow me Then you'll see Follow follow follow follow But the truth is hard to swallow Follow me Then you'll see Follow follow follow follow Follow me see a nightmare in action", DialogLayout.Bottom)
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . d d . . . . . . . . . d d 
        . . . d 9 d . 9 . 9 . 9 . d 9 d 
        . . . . d 9 d 9 9 9 9 9 d 9 d . 
        . . . . . d 9 9 9 9 9 9 9 d . . 
        9 9 . . . 9 8 8 1 d 8 1 8 9 . . 
        9 9 d . 8 8 d 8 1 d 8 1 d 8 8 . 
        9 d d . 8 8 9 d d b d d 9 8 8 . 
        . d d d d d d b b 9 9 9 . . . . 
        . . d d d d d d d d d d . . . . 
        . . d d d d d d d d d d . . . . 
        . . d d d d . d d . d d . . . . 
        . . d d d d . d d . d d . . . . 
        . . . d d . . 9 9 . 9 9 . . . . 
        . . . 9 9 9 . 9 9 . 9 9 . . . . 
        `, SpriteKind.Player)
    tileUtil.replaceAllTiles(assets.tile`tile44`, assets.tile`transparency16`)
    mySprite.follow(hero, 80)
    game.setDialogFrame(img`
        . f f f f f f f f f f f f f . . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f e e e e e e e e e f 3 f . 
        f 3 f f e e e e e e e f f 3 f . 
        f 3 3 f f f f f f f f f 3 3 f . 
        f f 3 3 3 3 3 3 3 3 3 3 3 f f . 
        . f f f f f f f f f f f f f . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    tileUtil.replaceAllTiles(assets.tile`myTile16`, assets.tile`tile1`)
})
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile69`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`Glaceons beautiful song`), music.PlaybackMode.LoopingInBackground)
    game.showLongText("Welcome to hell, you pathetic excuse! Think you're tough? You're a total goof! Thirty seconds 'til you're begging for release! Loser! Zero! Piece of greasy cheese!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`tile69`, assets.tile`myTile47`)
})
function initializeLevel (level: number) {
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile64`, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.stopAllSounds()
    music.play(music.stringPlayable("C D C D C D E F ", 120), music.PlaybackMode.InBackground)
    game.gameOver(false)
})
browserEvents.Two.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Why 2?", 1000, false)
})
function hasNextLevel () {
    return currentLevel != levelCount
}
browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Why 1?", 1000, false)
})
browserEvents.Period.onEvent(browserEvents.KeyEvent.Pressed, function () {
    hero.sayText("Go get a tampon", 1000, false)
})
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . 2 2 3 3 7 3 2 2 . . . . 
            . . . . 2 3 3 3 3 3 5 2 . . . . 
            . . . 2 3 5 3 2 2 3 3 3 2 . . . 
            . . . 2 3 3 3 2 . 3 3 7 2 . . . 
            . . . 2 3 3 3 2 . 3 3 3 2 . . . 
            . . . 2 3 7 3 2 2 3 3 3 2 . . . 
            . . . . 2 3 3 5 3 3 5 2 . . . . 
            . . . . 2 2 3 3 3 3 2 2 . . . . 
            . . . . . . 2 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Walking)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.UntilDone)
    music.play(music.createSong(assets.song`Ice theme`), music.PlaybackMode.LoopingInBackground)
    hero.sayText("Hey you found a unused level! GET OUT!!                                                  sorry you'll have to start over...")
    scene.setBackgroundImage(img`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888668888888888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888
        8888888888888888888888888888888668888888888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888886888888888888888888888886888888888888888688888888888888888888888688888888888888868888888888888888888888868888888888888886888888888888888888888886
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888886888888688888888888888888888888888888888688888868888888888888888888888888888888868888886888888888888888888888888888888886888888688888888
        8888888888888888888888888888886968888888888888888888888888888888888888696888888888888888888888888888888888888869688888888888888888888888888888888888886968888888
        8888888888888888888888888888888688888888888888888888888888888888888888868888888888888888888888888888888888888886888888888888888888888888888888888888888688888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888818888888888888888888888888888888888888881888888888888888888888888888888888888888188888888888888888888888888888888888888838888888888888888888888888888888
        8888888818888888888888888888888888888888888888881888888888888888888888888888888888888888188888888888888888888888888888888888888838888888888888888888888888888888
        8888881111188888888888888888888888888888888888111118888888888888888888888888888888888811111888888888888888888888888888888888883333388888888888888888888888888888
        8888888111888888888888888888888888888888888888811188888888888888888888888888888888888881118888888888888888888888888888888888888333888888888888888888888888888888
        8888888181888888888888888888888888888888888888818188888888888888888888888888888888888881818888888888888888888888888888888888888383888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888886888888888888888888888888888888888888888688888888888888888888888888888888888888868888888888888888888888888888888888888886888888
        8888888888888888888888888888888886888688888888888888888888888888888888888688868888888888888888888888888888888888868886888888888888888888888888888888888886888688
        8888888888888888888d888888888888868888888888888888888888888d888888888888868888888888888888888888888d888888888888868888888888888888888888888d88888888888886888888
        888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888
        8888888888888888888d888888888888666888888888888888888888888d888888888888666888888888888888888888888d888888888888666888888888888888888888888d88888888888866688888
        8888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888888888888888888888888888888888866888888
        8888888888888888888888688888888886888888888888888888888888888868888888888688888888888888888888888888886888888888868888888888888888888888888888688888888886888888
        8888886888888888888888688888888666688888888888688888888888888868888888866668888888888868888888888888886888888886666888888888886888888888888888688888888666688888
        8888886688888888888886668888888866688888888888668888888888888666888888886668888888888866888888888888866688888888666888888888886688888888888886668888888866688888
        8888886888888888888888688888866666888888888888688888888888888868888886666688888888888868888888888888886888888666668888888888886888888888888888688888866666888888
        8888866688888888888888666888886666668888888886668888888888888866688888666666888888888666888888888888886668888866666688888888866688888888888888666888886666668888
        8888886668888888888886668888888666668888888888666888888888888666888888866666888888888866688888888888866688888886666688888888886668888888888886668888888666668888
        8888866688888888888866668888866666688888888886668888888888886666888886666668888888888666888888888888666688888666666888888888866688888888888866668888866666688888
        6688886668888888888888666888888666666666668888666888888888888866688888866666666666888866688888888888886668888886666666666688886668888888888888666888888666666666
        6666666888888888888866668888666666666666666666688888888888886666888866666666666666666668888888888888666688886666666666666666666888888888888866668888666666666666
        6666666666688888888886666666666666666666666666666668888888888666666666666666666666666666666888888888866666666666666666666666666666688888888886666666666666666666
        6666666666666688888866666666666666666666666666666666668888886666666666666666666666666666666666888888666666666666666666666666666666666688888866666666666666666666
        6666666666667799999999999999776666666666666666666666779999999999999977666666666666666666666677999999999999997766666666666666666666667799999999999999776666666666
        6666666667799999999999999999999977666666666666666779999999999999999999997766666666666666677999999999999999999999776666666666666667799999999999999999999977666666
        6666666799999999999999999999999999997666666666679999999999999999999999999999766666666667999999999999999999999999999976666666666799999999999999999999999999997666
        6666679999999999999999999999996111199977666667999999999999999999999999611119997766666799999999999999999999999961111999776666679999999999999999999999996111199977
        7779999999996999999999999999996999111997777999999999699999999999999999699911199777799999999969999999999999999969991119977779999999996999999999999999996999111997
        9999999999996999999999999999996699911119999999999999699999999999999999669991111999999999999969999999999999999966999111199999999999996999999999999999996699911119
        1999999999996699999999999999966999999111199999999999669999999999999996699999911119999999999966999999999999999669999991111999999999996699999999999999966999999111
        1119999999966699999999999999996999999991111999999996669999999999999999699999999111199999999666999999999999999969999999911119999999966699999999999999996999999991
        9911119999996999999999999999966669999999991111999999699999999999999996666999999999111199999969999999999999999666699999999911119999996999999999999999966669999999
        9999999999966699999999999999996699999999999999999996669999999999999999669999999999999999999666999999999999999966999999999999999999966699999999999999996699999999
        9999999999996669999999999911166619999999999999999999666999999999991116661999999999999999999966699999999999111666199999999999999999996669999999999911166619999999
        9999999999966999999999911119966669999999999999999996699999999991111996666999999999999999999669999999999111199666699999999999999999966999999999911119966669999999
        9999999999966699999991111999996666999999999999999996669999999111199999666699999999999999999666999999911119999966669999999999999999966699999991111999996666999999
        9999999999666669999111199999666669999999999999999966666999911119999966666999999999999999996666699991111999996666699999999999999999666669999111199999666669999999
        9999999999966699111111999999966666699999999999999996669911111199999996666669999999999999999666991111119999999666666999999999999999966699111111999999966666699999
        1111999996666661111199999999666666999911111199999666666111119999999966666699991111119999966666611111999999996666669999111111999996666661111199999999666666999911
        1111111996666699999999999999996666911111111111199666669999999999999999666691111111111119966666999999999999999966669111111111111996666699999999999999996666911111
        1111111166666666999999999996666691111111111111116666666699999999999666669111111111111111666666669999999999966666911111111111111166666666999999999996666691111111
        1111111111666669999999999999666911111111111111111166666999999999999966691111111111111111116666699999999999996669111111111111111111666669999999999999666911111111
        1111111116666666999999999999691111111111111111111666666699999999999969111111111111111111166666669999999999996911111111111111111116666666999999999999691111111111
        1111111166666666661111199999111111111111111111116666666666111119999911111111111111111111666666666611111999991111111111111111111166666666661111199999111111111111
        1111111666666666661119999111111111111111111111166666666666111999911111111111111111111116666666666611199991111111111111111111111666666666661119999111111111111111
        1111111116666666199999111111111111111111111111111666666619999911111111111111111111111111166666661999991111111111111111111111111116666666199999111111111111111111
        1111111166666666699111111111111111111111111111116666666669911111111111111111111111111111666666666991111111111111111111111111111166666666699111111111111111111111
        1111111666666666661111111111111111111111111111166666666666111111111111111111111111111116666666666611111111111111111111111111111666666666661111111111111111111111
        1111111116666666666111111111111111111111111111111666666666611111111111111111111111111111166666666661111111111111111111111111111116666666666111111111111111111111
        1111111666666666661111111111111111111111111111166666666666111111111111111111111111111116666666666611111111111111111111111111111666666666661111111111111111111111
        1111111166666666611111111111111119999911111111116666666661111111111111111999991111111111666666666111111111111111199999111111111166666666611111111111111119999911
        9111111111666666661111111111111991111199911111111166666666111111111111199111119991111111116666666611111111111119911111999111111111666666661111111111111991111199
        9999111666666666661111111111999111111111999911166666666666111111111199911111111199991116666666666611111111119991111111119999111666666666661111111111999111111111
        1199991166666666666111111199111111111111119999116666666666611111119911111111111111999911666666666661111111991111111111111199991166666666666111111199111111111111
        1111999996666661111111199911111111111111111199999666666111111119991111111111111111119999966666611111111999111111111111111111999996666661111111199911111111111111
        1111119999999111111111911111111111111111111111999999911111111191111111111111111111111199999991111111119111111111111111111111119999999111111111911111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        `)
    tiles.setCurrentTilemap(tilemap`level3`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 2308, 2515, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 4575, 2515, 0, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Triangle, 3516, 1, 0, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    game.setDialogFrame(img`
        a a a a a a a a a a a a a a a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a c c c c c c c c c c c c c a 
        a a a a a a a a a a a a a a a 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . e e e e e e e . . . . . 
        . . . e 1 1 2 2 2 2 2 e . . . . 
        . . e 1 1 2 2 2 2 2 2 3 e . . . 
        . . e 1 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 2 3 e . . . 
        . . e 2 2 2 2 2 2 2 3 3 e . . . 
        . . e 2 2 2 2 2 2 3 3 3 e . . . 
        . . e 2 2 2 2 2 3 3 3 3 e . . . 
        . . . e 3 3 3 3 3 3 3 e . . . . 
        . . . . e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.showLongText("Hi Baby!  Didn't see you in a while! It looks like you need i kiss! here...", DialogLayout.Top)
    grid.snap(hero)
    tileUtil.replaceAllTiles(assets.tile`myTile30`, assets.tile`myTile35`)
    music.play(music.createSoundEffect(WaveShape.Triangle, 2107, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    pause(1000)
    tileUtil.replaceAllTiles(assets.tile`myTile35`, assets.tile`myTile30`)
    game.showLongText("Love you! See you in Hell!!", DialogLayout.Top)
    tileUtil.replaceAllTiles(assets.tile`myTile30`, assets.tile`transparency16`)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . 2 2 3 3 7 3 2 2 . . . . 
        . . . . 2 3 3 3 3 3 5 2 . . . . 
        . . . 2 3 5 3 2 2 3 3 3 2 . . . 
        . . . 2 3 3 3 2 . 3 3 7 2 . . . 
        . . . 2 3 3 3 2 . 3 3 3 2 . . . 
        . . . 2 3 7 3 2 2 3 3 3 2 . . . 
        . . . . 2 3 3 5 3 3 5 2 . . . . 
        . . . . 2 2 3 3 3 3 2 2 . . . . 
        . . . . . . 2 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogFrame(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        2 2 3 3 3 5 3 3 3 3 3 3 3 2 2 . 
        2 3 d 3 3 3 3 3 3 3 7 3 5 3 2 . 
        2 3 3 3 2 2 2 2 2 2 2 3 3 3 2 . 
        2 3 3 2 e e e e e e e 2 3 3 2 . 
        2 3 5 2 e e e e e e e 2 d 3 2 . 
        2 3 3 2 e e e e e e e 2 3 3 2 . 
        2 3 3 2 e e e e e e e 2 3 3 2 . 
        2 3 3 2 e e e e e e e 2 3 3 2 . 
        2 5 3 2 e e e e e e e 2 3 3 2 . 
        2 3 3 2 e e e e e e e 2 3 7 2 . 
        2 3 7 3 2 2 2 2 2 2 2 5 3 3 2 . 
        2 3 3 3 3 3 3 3 3 3 3 3 3 3 2 . 
        2 2 3 3 3 3 5 3 3 3 3 d 3 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        `)
})
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let Wife: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let MarshmellowAnimation: animation.Animation = null
let Marshmellow: Sprite = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let Eevee: Sprite = null
let mySprite: Sprite = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f 5 f . . . . . f f 5 f . 
    . . f f 5 f f f f f f f f 5 f f 
    . . f f 5 f f f 5 5 5 f f 5 f f 
    . . . . . f f f 5 f 5 f f f . . 
    . f . . . f 2 f 5 5 5 f 2 f . . 
    f f f . . f 1 f f f f f 1 f . . 
    f f f . . f 2 f 2 f 2 f 2 f . . 
    5 5 5 . . f f f b b b f f f . . 
    f f f . . f f b f f f b f f . . 
    . f f f f f f f f f f f f . . . 
    . . f f f f f f f f f f f . . . 
    . . f f f f f f f f f f f . . . 
    . . f 5 f . . f f . . f f . . . 
    . . f f f . . 5 f . . f 5 . . . 
    . . . f f f . f f . . f f . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
initializeAnimations()
createPlayer(hero)
levelCount = 11
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Walking)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Walking)
        }
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
