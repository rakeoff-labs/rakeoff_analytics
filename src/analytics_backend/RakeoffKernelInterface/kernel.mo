module {
    public type BlockIndex = Nat64;
    public type CanisterAccounts = {
        ckbtc_address : Text;
        icp_address : Text;
        ckbtc_balance : Nat;
        icp_balance : Nat64;
    };
    public type CanisterHttpResponsePayload = {
        status : Nat;
        body : Blob;
        headers : [HttpHeader];
    };
    public type CanisterStats = {
        icp_earned_from_swap : Nat64;
        lotto_winners : [(Principal, Nat64)];
        icp_fees_collected : Nat64;
        price_per_ticket : Nat64;
        tickets_in_lotto : Nat;
        max_tickets_allowed : Nat;
        last_winner : (Principal, Nat64);
        total_ckbtc_exchanged : Nat;
        icp_earned_from_disbursement : Nat64;
        icp_in_lotto : Nat64;
    };
    public type HttpHeader = { value : Text; name : Text };
    public type Result = { #ok : TransferResult; #err : Text };
    public type Result_1 = { #ok : Result__1; #err : Text };
    public type Result_2 = { #ok : Text; #err : Text };
    public type Result_3 = { #ok : WalletInfo; #err : Text };
    public type Result_4 = { #ok : Nat64; #err };
    public type Result_5 = { #ok : CanisterAccounts; #err : Text };
    public type Result_6 = { #ok : [?Principal]; #err };
    public type Result__1 = { #Ok : Nat; #Err : TransferError__1 };
    public type Tokens = { e8s : Nat64 };
    public type TransferError = {
        #TxTooOld : { allowed_window_nanos : Nat64 };
        #BadFee : { expected_fee : Tokens };
        #TxDuplicate : { duplicate_of : BlockIndex };
        #TxCreatedInFuture;
        #InsufficientFunds : { balance : Tokens };
    };
    public type TransferError__1 = {
        #GenericError : { message : Text; error_code : Nat };
        #TemporarilyUnavailable;
        #BadBurn : { min_burn_amount : Nat };
        #Duplicate : { duplicate_of : Nat };
        #BadFee : { expected_fee : Nat };
        #CreatedInFuture : { ledger_time : Nat64 };
        #TooOld;
        #InsufficientFunds : { balance : Nat };
    };
    public type TransferResult = { #Ok : BlockIndex; #Err : TransferError };
    public type TransformArgs = {
        context : Blob;
        response : CanisterHttpResponsePayload;
    };
    public type WalletInfo = {
        principal : Text;
        tickets : Nat;
        ckbtc_address : Text;
        icp_address : Text;
        ckbtc_balance : Nat;
        icp_balance : Nat64;
    };
    public type Self = actor {
        admin_add_user_to_lotto : shared (Text, Nat64) -> async Result_2;
        admin_view_lotto_entries : shared () -> async Result_6;
        canister_withdraw_ckbtc : shared (Nat, Text) -> async Result_1;
        canister_withdraw_icp : shared (Nat64, Text) -> async Result;
        generate_winner_and_disburse_reward : shared () -> async Result_2;
        get_canister_accounts : shared () -> async Result_5;
        get_canister_stats : shared query () -> async CanisterStats;
        get_disbursed_icp_fee : shared Nat64 -> async Result_4;
        get_wallet_info : shared () -> async Result_3;
        participate_in_lotto : shared Nat64 -> async Result_2;
        swap_icp_to_ckbtc : shared Nat64 -> async Result_2;
        transform : shared query TransformArgs -> async CanisterHttpResponsePayload;
        withdraw_ckbtc : shared (Nat, Text) -> async Result_1;
        withdraw_icp : shared (Nat64, Text) -> async Result;
    };
};
