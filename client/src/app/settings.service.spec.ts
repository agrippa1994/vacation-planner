import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
  });

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });

  it("should return false if settings are not valid", async () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.username = "";
    service.defaultCurrency = "";
    expect(service.areSettingsValid).toBeFalsy();
  });

  it("should save to local storage", async () => {
    const service: SettingsService = TestBed.get(SettingsService);

    service.defaultCurrency = "EUR";
    service.username = "manfredo";
    service.save();
  });

  it("should read settings from local storage", async () => {
    const service: SettingsService = TestBed.get(SettingsService);
    service.defaultCurrency = "EUR";
    service.username = "manfredo";
    service.save();

    const service2: SettingsService = TestBed.get(SettingsService);
    expect(service2.defaultCurrency).toBe("EUR");
    expect(service2.username).toBe("manfredo");
  });
});
