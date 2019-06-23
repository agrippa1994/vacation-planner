import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

describe('NotesService', () => {
  let httpClientSpy, settingsServiceSpy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    settingsServiceSpy = jasmine.createSpy("SettingsService");

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
      ],
    });

    settingsServiceSpy.url = "url";
    settingsServiceSpy.username = "manfredo";
  });

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });

  it("should get all notes", async () => {
    const service: NotesService = TestBed.get(NotesService);
    (httpClientSpy.get as jasmine.Spy).and.returnValue(["some note"]);

    const result = service.allNotes();

    expect(httpClientSpy.get).toHaveBeenCalledWith("url/api/notes");
    expect(result).toEqual(["some note"] as any);
  });
});
