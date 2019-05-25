import { TestBed } from '@angular/core/testing';

import { StudentsDataService } from './students-data.service';

describe('StudentsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentsDataService = TestBed.get(StudentsDataService);
    expect(service).toBeTruthy();
  });
});
