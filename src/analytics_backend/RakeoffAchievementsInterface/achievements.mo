module {
    public type AchievementLevel = {
        level_id : Nat;
        icp_amount_needed : Nat64;
        icp_reward : Nat64;
    };
    public type CanisterAccount = {
        ongoing_transfers : [(Principal, Nat64)];
        icp_claimed : Nat64;
        icp_address : Text;
        total_neurons_added : Nat;
        icp_balance : Nat64;
    };
    public type NeuronAchievementDetails = {
        neuron_passes_checks : Bool;
        current_level : AchievementLevel;
        cached_level : ?AchievementLevel;
        reward_amount_due : Nat64;
        neuron_id : Nat64;
    };
    public type NeuronCheckArgs = {
        dissolve_delay_seconds : Nat64;
        state : Int32;
        stake_e8s : Nat64;
        neuronId : Nat64;
        age_seconds : Nat64;
    };
    public type Result = { #ok : CanisterAccount; #err : Text };
    public type Result_1 = { #ok : Text; #err : Text };
    public type Result_2 = { #ok : NeuronAchievementDetails; #err : Text };
    public type Self = actor {
        check_achievement_level_reward : shared query NeuronCheckArgs -> async Result_2;
        claim_achievement_level_reward : shared Nat64 -> async Result_1;
        get_canister_account_and_stats : shared () -> async Result;
        show_available_levels : shared query () -> async [AchievementLevel];
    };
};
