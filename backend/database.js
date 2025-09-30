import { createClient } from '@supabase/supabase-js';
import { env } from 'node:process';

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://tu-supabase-url.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseDatabase {
  constructor() {}

  // Busca todos los registros en una tabla
  async findAll(tableName) {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) throw error;
    return data;
  }

  // Busca por Id
  async findById(tableName, id) {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  // Buscasqueda por criterios
  async findOneBy(tableName, criteria) {
    const query = supabase.from(tableName).select('*');
    for (const [key, value] of Object.entries(criteria)) {
      query.eq(key, value);
    }
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  async insert(tableName, newRecord) {
    const { data, error } = await supabase.from(tableName).insert(newRecord).select();
    if (error) throw error;
    return data[0];
  }

  async update(tableName, id, updates) {
    const { data, error } = await supabase.from(tableName).update(updates).eq('id', id).select();
    if (error) throw error;
    return data[0];
  }

  async delete(tableName, id) {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}

export default new SupabaseDatabase();