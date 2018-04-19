import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppData } from '../../../app.data';
import { AppSettings } from '../../../app.settings';
import { TagInputModule } from 'ng2-tag-input';

@Component({

    selector: 'people-picker',
    templateUrl: './people-picker.component.html'

})

export class PeoplePickerComponent implements OnInit {
    @Input() public PlaceHolder: string = '';
    @Input() public bindModelData = new Array();
    @Input() public Users = new Array();
    @Input() public User: any;
    @Input() public UserId: string;
    @Input() public DisplayName: string;
    @Input() public LimitItems: number = 5;
    @Output() public onPeopleAdded = new EventEmitter<any>();

    constructor(public appData: AppData) { }

    public ngOnInit() {
        if (this.User && this.Users.length === 0) {
            this.Users.push({ display: this.User.DisplayName, value: this.User.UserId ? this.User.UserId : this.User.Id });
        } else if (this.UserId && this.DisplayName && this.Users.length === 0) {
            this.Users.push({ display: this.DisplayName, value: this.UserId });
        }
    }

    public requestAutocompleteItems = (text: string) => {
        return this.appData.get(this.appData.url.ADPeoplePicker, [text])
            .map((data) => data.map((item) => ({ display: item.DisplayName, value: item })));
    }

    public onItemAdded(item) {
        this.onPeopleAdded.emit(item);
    }

    public onItemRemove(item) {
        let index = this.Users.indexOf(item);
        if (index > -1) {
            this.Users.splice(index, 1);
        }
    }
}
