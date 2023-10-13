module {
    public type RakeoffStats = {
        total_icp_rewarded : Nat64;
        total_icp_stakers : Nat;
        total_icp_staked : Nat64;
    };
    public type Result = { #ok; #err };
    public type Result_1 = { #ok : Text; #err };
    public type Self = actor {
        get_rakeoff_stats : shared query () -> async RakeoffStats;
        set_api_key : shared Text -> async Result_1;
        track_user_staked_amount : shared (Text, Nat64) -> async Result;
        update_prize_award_stats : shared () -> async Result;
    };
};
