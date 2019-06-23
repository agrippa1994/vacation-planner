import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http'
import { SettingsService } from './settings.service';
import { PositionService } from './position.service';
import { createPosition } from './test-helpers';

describe('MapService', () => {
  let httpClientSpy: HttpClient;
  let settingsServiceSpy: SettingsService;
  let positionServiceSpy: PositionService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get", "post"]);
    settingsServiceSpy = { username: "manfredo" } as SettingsService;
    positionServiceSpy = jasmine.createSpyObj("PositionService", ["getCurrentPosition"]);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
        { provide: PositionService, useValue: positionServiceSpy },
      ],
    });

    jasmine.clock().install();
  });

  afterEach(() => {
    const service: MapService = TestBed.get(MapService);
    service.cancel();

    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });

  it("should update positions on setup", async () => {
    const service: MapService = TestBed.get(MapService);
    const subscriber = jasmine.createSpy("position changed spy");

    (positionServiceSpy.getCurrentPosition as jasmine.Spy).and.returnValue(createPosition());
    (httpClientSpy.post as jasmine.Spy).and.returnValue({ toPromise: async () => Promise.resolve() });
    (httpClientSpy.get as jasmine.Spy).and.returnValue({ toPromise: async () => Promise.resolve(["some data"]) });

    service.positionsChanged.subscribe(subscriber);
    await service.setup()

    expect(positionServiceSpy.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledWith("/api/position", jasmine.any(Object));
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(service.positions.length).toEqual(1);
    expect(service.positions).toEqual(["some data"] as any);
    expect(subscriber.calls.count()).toEqual(1);
  });

  it("should not fetch any user positions if our position can not be retrieved", async () => {
    const service: MapService = TestBed.get(MapService);
    (positionServiceSpy.getCurrentPosition as jasmine.Spy).and.throwError("can not retrieve position");

    await service.setup()

    expect(positionServiceSpy.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledTimes(0);
    expect(httpClientSpy.get).toHaveBeenCalledTimes(0);
    expect(service.positions.length).toEqual(0);
  });

  it("should upload positions and fetch everything after two seconds", async () => {
    const service: MapService = TestBed.get(MapService);
    const subscriber = jasmine.createSpy("position changed spy");

    (positionServiceSpy.getCurrentPosition as jasmine.Spy).and.returnValue(createPosition());
    (httpClientSpy.post as jasmine.Spy).and.returnValue({ toPromise: async () => Promise.resolve() });
    (httpClientSpy.get as jasmine.Spy).and.returnValue({ toPromise: async () => Promise.resolve(["some data"]) });

    service.positionsChanged.subscribe(subscriber);
    await service.setup()
    jasmine.clock().tick(2001);

    expect(positionServiceSpy.getCurrentPosition).toHaveBeenCalledTimes(2);
  });
});
