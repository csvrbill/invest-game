describe("Game", function() {


    beforeEach(function() {

    });

    it("should one player has 1000 point asset on game starting", function(){
        var game = new Game(["130"]);
        var result = game.result();

        expect(result.asset_of("130")).toBe("1000");
    });

    it("should each_player list all player in result", function(){
        var game = new Game(["130","131"]);
        var result = game.result();

        var count = 0;
        result.each_player(function(player){
          count++;
        });

        expect(count).toBe(2);

    });

    it("should each player has 1000 point asset on game starting", function(){
        var game = new Game(["130"]);
        var result = game.result();

        result.each_player(function(player){
            expect(player.asset()).toBe("1000");
        });

    });


    it("should invest guys not get 0 when less than 90% player investing", function() {
        var game = new Game(["130","131","132","133","134","135","136","137","138","139"]);
        game.accept({"id":"130","message":"B"});
        game.accept({"id":"131","message":"B"});
        game.accept({"id":"132","message":"A10"});
        game.accept({"id":"133","message":"B"});
        game.accept({"id":"134","message":"A10"});
        game.accept({"id":"135","message":"B"});
        game.accept({"id":"136","message":"B"});
        game.accept({"id":"137","message":"B"});
        game.accept({"id":"138","message":"B"});
        game.accept({"id":"139","message":"B"});

        var result = game.result();

        expect(result.payoff_of("130")).toBe("0");
        expect(result.payoff_of("132")).toBe("0");

        expect(result.asset_of("132")).toBe("990");
        expect(result.asset_of("134")).toBe("990");

        expect(result.asset_of("130")).toBe("1000");
    });

    it("should invest guys not get 10% return when more than 90% player investing", function() {
        var game = new Game(["130","131","132","133","134","135","136","137","138","139","140"]);
        game.accept({"id":"130","message":"A10"});
        game.accept({"id":"131","message":"A10"});
        game.accept({"id":"132","message":"A10"});
        game.accept({"id":"133","message":"A10"});
        game.accept({"id":"134","message":"A10"});
        game.accept({"id":"135","message":"A10"});
        game.accept({"id":"136","message":"A100"});
        game.accept({"id":"137","message":"A10"});
        game.accept({"id":"138","message":"A10"});
        game.accept({"id":"139","message":"A10"});
        game.accept({"id":"140","message":"B"});

        var result = game.result();

        expect(result.payoff_of("140")).toBe("0");
        expect(result.payoff_of("139")).toBe("1");
        expect(result.payoff_of("136")).toBe("10");

        expect(result.asset_of("132")).toBe("1001");
        expect(result.asset_of("134")).toBe("1001");

        expect(result.asset_of("136")).toBe("1010");
    });

    it("should be interrupt when call stop, remove not replied user,calculate result base on existed user ", function() {
        var game = new Game(["130","131","132","133","134","135","136","137","138","139","140"]);
        game.accept({"id":"130","message":"A10"});
        game.accept({"id":"131","message":"A10"});
        game.accept({"id":"132","message":"A10"});
        game.accept({"id":"133","message":"A10"});
        game.accept({"id":"134","message":"A10"});
        game.accept({"id":"135","message":"A10"});
        game.accept({"id":"136","message":"A100"});
        game.accept({"id":"137","message":"A10"});
        game.accept({"id":"140","message":"B"});

        game.stop();
        var result = game.result();

        expect(result.payoff_of("140")).toBe("0");
        expect(result.payoff_of("136")).toBe("0");

        expect(result.asset_of("132")).toBe("990");
        expect(result.asset_of("134")).toBe("990");

        expect(result.asset_of("136")).toBe("900");
    });



});