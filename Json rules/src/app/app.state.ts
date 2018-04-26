import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = { };

  /**
   * Already return a clone of the current state.
   */
  public get state() {
    return this._state = this._clone(this._state);
  }
  /**
   * Never allow mutation
   */
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    /**
     * Use our state getter for the clone.
     */
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    /**
     * Internally mutate our state.
     */
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    /**
     * Simple object clone.
     */
    return JSON.parse(JSON.stringify( object ));
  }
}
// export class AppState {
//   public stateId = { // State Id
//     isAccessDenied: 'isAccessDenied',
//     token: 'token',
//     userInfo: 'USER_INFO',
//     MyProjects: 'MY_PROJECTS',
//     ProjectSummary: 'PROJECT_SUMMARY',
//     OpportunitySummary: 'OPPORTUNITY_SUMMARY',
//     Categories: 'Categories',
//     SubCategories: 'SubCategories',
//     EndUse: 'EndUse',
//     ProdType: 'ProdType',
//     CreativeCenter: 'CreativeCenter',
//     CostBook: 'CostBook',
//     Currencies: 'Currencies',
//     SupportTeam: 'SupportTeam',
//     Roles: 'Roles',
//     UserClockSettings: 'UserClockSettings',
//     PlantLocations: 'PlantLocations',
//     Projects: 'Projects',
//     ProjectsToCopy: 'ProjectsToCopy',
//     HomePageUserPreferences: 'HomePageUserPreferences',
//     isSITileView: 'SIListOrTileView',
//     Regions: 'Regions',
//     Countries: 'Countries',
//     SelectedCreativeCenter: 'SelectedCreativeCenter',
//     OlfactiveFamily: 'OlfactiveFamily',
//     OlfactiveSubFamily: 'OlfactiveSubFamily',
//     OlfactiveHierarchy: 'OlfactiveHierarchy',
//     FragranceLibraryOverview: 'FragranceLibraryOverview',
//     Descriptors: 'Descriptors',
//     VersionOf: 'VersionOf',
//     Keywords: 'Keywords',
//     FinePerfumeryModel: 'FinePerfumeryModel',
//     RedirectUri: '/home',
//     ScentPortfolioOverview: 'ScentPortfolioOverview',
//     FreeSearchText: '',
//     FragranceProjects: 'FragranceProjects',
//     FragranceSearchFilters: 'FragranceSearchFilters',
//     FragrnaceSearchActiveTab: 'FragrnaceSearchActiveTab',
//     ProjectSearchFilters: 'ProjectSearchFilters',
//     // ScentPortfolioSearchFilters: 'ScentPortfolioSearchFilters',
//     // ScentPortfolioSearchActiveTab: 'ScentPortfolioSearchActiveTab',
//     Tasks: 'Tasks',
//     SelectedWorklistItems: 'SelectedWorklistItems',
//     IpcDetails: 'IpcDetails',
//   };

//   public _state: InternalStateType = {};
//   constructor(private injector: Injector) {
//     // tslint:disable-next-line:whitespace
//   }

//   public getCurrentUser(): IUserInfo {
//     return this.get(this.stateId.userInfo);
//   }


//   // already return a clone of the current state
//   public get state() {
//     return this._state = this._clone(this._state);
//   }
//   // never allow mutation
//   public set state(value) {
//     throw new Error('do not mutate the `.state` directly');
//   }

//   public get(prop?: any) {
//     // use our state getter for the clone
//     const state = this.state;
//     return state.hasOwnProperty(prop) ? state[prop] : null;
//   }

//   public set(prop: string, value: any) {
//     // internally mutate our state
//     return this._state[prop] = value;
//   }

//   private _clone(object: InternalStateType) {
//     // simple object clone
//     return JSON.parse(JSON.stringify(object));
//   }
// }