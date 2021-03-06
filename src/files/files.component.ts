import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

import { GraphService } from "../services/graph.service";
import { ToastComponent } from "../toast/toast.component";
import { USER_MESSAGES } from "../messages/messages";
import { OFFICE_URLS } from "../office/office-urls";

@Component({
    selector: "my-files",
    templateUrl: "src/files/view-files.html",
})

export class FilesComponent implements OnInit {
    private files;

    constructor(private graph: GraphService,
                private toast: ToastComponent,
                private changeRef: ChangeDetectorRef) {
    }

    public ngOnInit() {
        this.toast.show(USER_MESSAGES.get_files);
        this.getFiles();
    }

    public getFiles() {
        this.graph.getRequestPromise(OFFICE_URLS.me_drive_url)
            .then((data: any) => {
                if (data) {
                    this.files = data.value;
                    this.changeRef.detectChanges();
                } else {
                    this.toast.show(USER_MESSAGES.fail_graph_api);
                }
            }).catch(() => {
                this.toast.show(USER_MESSAGES.fail_graph_api);
            });
    }

    public refreshInfo() {
        this.getFiles();
    }
}
