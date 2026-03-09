import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { CreateProfessionalDTO } from '../../dtos/create-professional.dto';
import { IProfessional } from '../../../../core/interfaces/professional.interface';
import { SupabaseService } from '../../../../core/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private readonly supabase = inject(SupabaseService);

  create(professionalData: CreateProfessionalDTO): Observable<IProfessional> {
    return from(
      this.supabase.client
      .from('professionals')     
      .insert(professionalData)
      .select()
      .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return data as IProfessional;
      }
    ));
  }
}
