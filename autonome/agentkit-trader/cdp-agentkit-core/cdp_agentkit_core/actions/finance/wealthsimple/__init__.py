# Core Action Class
from cdp_agentkit_core.actions.finance.wealthsimple.action import WealthsimpleAction
# =============================== Register all other Actions below ===============================================
#from cdp_agentkit_core.actions.finance.wealthsimple.xxx import yyyAction
from cdp_agentkit_core.actions.finance.wealthsimple.account_login import AccountLoginAction
from cdp_agentkit_core.actions.finance.wealthsimple.account_otp import AccountOTPAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_activities import FetchActivitiesAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_historical_quotes import FetchHistoricalAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_news import FetchNewsAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_option_chain import FetchOptionChainAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_option_expiry import FetchOptionExpiryAction
from cdp_agentkit_core.actions.finance.wealthsimple.fetch_security import FetchSecurityAction

def get_all_wealthsimple_actions() -> list[type[WealthsimpleAction]]:
    actions = []
    for action in WealthsimpleAction.__subclasses__():
        actions.append(action())

    return actions


WEALTHSIMPLE_ACTIONS = get_all_wealthsimple_actions()


# Manually List out all the actions.. 
__all__ = [
    "WEALTHSIMPLE_ACTIONS",
    "AccountLoginAction",
    "AccountOTPAction",
    "FetchActivitiesAction",
    "FetchHistoricalAction",
    "FetchNewsAction",
    "FetchOptionChainAction",
    "FetchOptionExpiryAction",
    "FetchSecurityAction",
]
