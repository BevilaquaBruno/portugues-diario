import { Injectable } from '@nestjs/common';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { Tip } from './entities/tip.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindTipDto } from './dto/find-tip.dto';

@Injectable()
export class TipsService {
  constructor(@InjectRepository(Tip) private tipRepository: Repository<Tip>){}

  create(createTip: CreateTipDto) {
    return this.tipRepository.save(createTip);
  }

  findAll(findTip: FindTipDto) {
    return this.tipRepository.find({
      take: findTip.limit,
      skip: findTip.page,
    });
  }

  findOne(id: number) {
    return this.tipRepository.findOneBy({ id: id });
  }

  update(id: number, updateTipDto: UpdateTipDto) {
    return this.tipRepository.update(id, updateTipDto);
  }

  remove(id: number) {
    return this.tipRepository.delete(id);
  }

  likeTip(id: number) {
    this.findOne(id).then(async (tip) => {
      if(null == tip) return { raw: {}, affected: 0 };
      return await this.tipRepository.update(id, { likes:  tip.likes + 1 });
    });
  }

  dislikeTip(id: number) {
    this.findOne(id).then(async (tip) => {
      if(null == tip) return { raw: {}, affected: 0 };
      return await this.tipRepository.update(id, { likes:  tip.likes - 1 });
    });
  }

  reset() {
    return this.tipRepository.update({}, { showed_in_date: null });
  }

  getTodayTip(date: string) {
    return this.tipRepository.createQueryBuilder('tip').where('tip.showed_in_date = :date', { date: date }).getOne();
  }

  getFirstTipWithoutDate() {
    return this.tipRepository.createQueryBuilder('tip').where('tip.showed_in_date IS NULL').orderBy('tip.id').getOne();
  }

  count() {
    return this.tipRepository.count();
  }
}
